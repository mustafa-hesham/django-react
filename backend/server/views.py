from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def index(request):
    context = {}
    return render(request, "index.html", context)


@ensure_csrf_cookie
def category(request, category):
    context = {"category": category}
    return render(request, "index.html", context)


@ensure_csrf_cookie
def product_page(request, SKU, productName):
    context = {"SKU": SKU, "productName": productName}
    return render(request, "index.html", context)
