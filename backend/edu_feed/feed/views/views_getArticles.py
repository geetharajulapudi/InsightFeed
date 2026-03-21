from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from edu_feed.settings import BASE_URL, API_KEY

"""View to fetch articles from a external API."""
class ExternalArticlesView(APIView):
    def get(self, request):

        """Fetch articles from external API based on query parameter 'q'."""
        query = request.GET.get("q", "")

        """Build query parameters for the external API."""
        params = {
            "order-by": "relevance" if query else "newest",
            "page-size": 100,
            "page": 1,
            "show-fields": "thumbnail,trailText,bodyText",
            "api-key": API_KEY,
        }

        """Add search query if provided."""
        if query:
            params["q"] = query

        """Make the external API request and process the response."""
        try:
            response = requests.get(BASE_URL, params=params)
            response.raise_for_status()

            data = response.json()
            results = data.get("response", {}).get("results", [])

            """simplifying the external API response to easily consumable format."""
            simplified_articles = [
                {
                    "article_id": articles.get("id"),
                    "article_image": articles.get("fields", {}).get("thumbnail"),
                    "sectionname": articles.get("sectionName"),
                    "article_title": articles.get("webTitle"),
                    "trailtext": articles.get("fields", {}).get("trailText"),
                    "description": articles.get("fields", {}).get("bodyText"),
                    "weburl": articles.get("webUrl"),
                }
                for articles in results
            ]

            return Response(simplified_articles)
        
        #returns error response if the external API request fails
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": "Failed to fetch articles", "details": str(e)},
                status=500
            )
