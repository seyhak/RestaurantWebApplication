# from django.contrib.auth.models import User
# from django.http import HttpResponseRedirect


def get_current_user(request):
    return request.user
    #    return HttpResponseRedirect(reverse('BasicBusinessManager:main'))
