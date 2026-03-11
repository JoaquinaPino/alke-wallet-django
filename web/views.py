from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied

def index(request):
    return render(request, "web/index.html")

@login_required
def menu(request):
    return render(request, "web/menu.html")

@login_required
def deposit(request):
    return render(request, "web/deposit.html")

@login_required
def sendmoney(request):
    return render(request, "web/sendmoney.html")

@login_required
def transactions(request):
    return render(request, "web/transactions.html")