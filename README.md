# parse-mapper-angularjs-swagger

##API Mapper for Angular-Swagger
- can diff and map any to any swagger version (currently 1.2 and 2.0)
- designed to process api result based on promise
- process response error message from server and fallback to generic error
- process business exception error message (tested on default java object, errorInfo on response success)


## Build
**in order to avoid issue with server's cors, run as admin:**
```shell
npm install
bower install
gulp sass
```

## Run (in cmd as admin to avoid cors server unable to start)
```shell
npm start
```


## Diff and generate angular data services
- once the app is loaded, set app name (your main app module's name), the api docs url (the url to swagger.json)
- if local api docs is loaded, the diff will be calculated (how exactly the api got changed)

**process of entire app is split into 4 views:**
- intro (where swagger info is set)
- models (inform dev about api data models changes)
- services (inform about api methods changes)
- processor (generate angular services based on available swagger api descriptors)


## Use data services in your angular app
define API_URL with your server api url, as angular constant
load dataservice.js and dataservices.js
set dataservices as dependecy for your app
now you have access to your api directly based on your server controller/method name

**when api changes, just update the dataservices.js alone using the webapp (diff included)**

HTTP Objects:
- paths (object with property name equal to url path param)
- data (classic body)
- etc (any type to set to request)

EXAMPLE FOR
http://petstore.swagger.io/
USE JSON TO RENDER SERVICES
http://petstore.swagger.io/v2/swagger.json

you can "Find pet by ID":

```javascript
petDataService.getPetById({ // make the call
  "paths": {
    "petId": value_pet_id_number
  }
}).then(function(pet) { // get the pet on success
  alert("your pet name is " + pet.name);
}, function(errorMessage) { // get the error message on fail
  alert(errorMessage);
});
```

you can 'Update an existing pet', based on the swagger info:

```javascript
petDataService.updatePet({
  data: {
    "id": value_pet_id_number,
    "category": {
      "id": value_pet_category_id_number,
      "name": value_pet_category_name
    },
    "name": value_pet_name,
    "photoUrls": [
      value_photo_url_one, value_photo_url_two, value_photo_url_etc
    ],
    "tags": [
      {
        "id": value_tag_one_id_number,
        "name": value_tag_one_name
      },
	  {
        "id": value_tag_etc_id_number,
        "name": value_tag_etc_name
      }
    ],
    "status": "available"
  }
})
```

## NOTE:
- thanks to Bogdan Merlusca for support
- angular 1.x.x data services supported only (angular 2 may be supported in near future - partial implemented)
- this tool provide a way to call api as you would call controller methods directly from the server by a request object
