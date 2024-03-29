"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView
from server.views import index, category, product_page, my_account_page
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))
    ),  # exempted during development.
    path("", index, name="index"),
    path("<category>", category, name="category"),
    path(
        "service-worker.js",
        TemplateView.as_view(template_name="service-worker.js"),
    ),
    path(
        "service-worker.js.map",
        TemplateView.as_view(template_name="service-worker.js.map"),
    ),
    path("manifest.json", TemplateView.as_view(template_name="manifest.json")),
    path("robots.txt", TemplateView.as_view(template_name="robots.txt")),
    path("<SKU>/<productName>", product_page, name="PDP"),
    path("my_account/<tab>", my_account_page, name="PDP"),
]
