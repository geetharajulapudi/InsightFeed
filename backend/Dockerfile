#stage1 builder
FROM python:3.12-slim AS builder

ENV PYTHONBUFFERED=1

ENV PYTHONPATH=/app/edu_feed  

COPY requirement.txt .

RUN pip3 install --no-cache-dir --prefix=/install -r requirement.txt

COPY . . 

#stage2 image
FROM python:3.12-slim

ENV PYTHONPATH=/app/edu_feed

WORKDIR /app

COPY --from=builder /install /usr/local/

COPY --from=builder /app /app

EXPOSE 10000

WORKDIR /app/edu_feed/

CMD ["gunicorn", "edu_feed.wsgi:application", "--bind", "0.0.0.0:10000"]
