from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.urls import reverse
from django.core import exceptions
from django.views.generic.base import TemplateView
from django.contrib.auth import authenticate, login, logout
from django.contrib import sessions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.

class MainView(TemplateView):
    template_name = 'WebHtmls/EN/Home.html'
    # sends context data to html. It has to be "get_context_data"
    '''def get_context_data(self, **kwargs):
        context = super(MainView, self).get_context_data(**kwargs)
        context.update({
            'first_run': self.kwargs.get('first_run', True),
            #'var2': self.kwargs.get('var2', None),
        })
        return context'''