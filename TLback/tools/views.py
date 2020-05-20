from django.shortcuts import render

def store(request):
	context = {}
	return render(request, 'tools/store.html', context)

def cart(request):
	context = {}
	return render(request, 'tools/cart.html', context)

def checkout(request):
	context = {}
	return render(request, 'tools/checkout.html', context)