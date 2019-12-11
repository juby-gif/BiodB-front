from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.shortcuts import render # STEP 1 - Import
from django.shortcuts import redirect

# --- HOMEPAGE --- #

def index_page(request):
    return render(request, "pages/homepage/index.html", {})


def contact_page(request):
    return render(request, "pages/homepage/contact.html", {})


# --- GATEWAY --- #


def register_page(request):
    return render(request, "pages/gateway/register.html", {})


def register_success_page(request):
    return render(request, "pages/gateway/register_success.html", {})


def login_page(request):
    return render(request, "pages/gateway/login.html", {})


def logout_page(request):
    return render(request, "pages/gateway/logout.html", {})

def dashboard_page(request):
    return render(request, "pages/dashboard/dashboard.html", {})

# class HomePageView(View):
#     def get(self, request, *args, **kwargs):
#         return render(request, 'pages/dashboard/charts.html',{})
#

# --- USER PROFILE --- #


def profile_retrieve_page(request):
    return render(request, "pages/user_profile/retrieve.html", {})

def profile_update_page(request):
    return render(request, "pages/user_profile/update.html", {})
