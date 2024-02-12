from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from graphql_jwt.decorators import login_required


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


@login_required
@ensure_csrf_cookie
def my_account_page(request, tab):
    context = {"tab": tab}
    return render(request, "index.html", context)
