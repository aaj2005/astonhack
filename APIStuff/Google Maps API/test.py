import googlemaps
from datetime import datetime
from pprint import pprint

# gmaps = googlemaps.Client(key="AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0")

# # Geocoding an address
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')


# gmaps.geocode()

def func():
    inputString = "restaurants%20in%20birmingham"
    src = "https://www.google.com/maps/embed/v1/search?q=" + str(inputString) + "&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0"
    return src

print(func)
# # Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# # Request directions via public transit
# now = datetime.now()
# directions_result = gmaps.directions("Sydney Town Hall",
#                                      "Parramatta, NSW",
#                                      mode="transit",
#                                      departure_time=now)

# # Validate an address with address validation
# addressvalidation_result =  gmaps.addressvalidation(['1600 Amphitheatre Pk'], 
#                                                     regionCode='US',
#                                                     locality='Mountain View', 
#                                                     enableUspsCass=True)

# print(geocode_result)