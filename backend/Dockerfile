# stage1 builder
FROM python:3.11-slim AS builder

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirement.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirement.txt

COPY . .

# stage2 image
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /install /usr/local/
COPY --from=builder /app /app

EXPOSE 10000

CMD ["gunicorn", "edu_feed.wsgi:application", "--bind", "0.0.0.0:10000"]