# CarCar

Team:

* Person 1 - Nicolas Asparria - Automobile Service
* Person 2 - Victoria Ziegler - Auto Sales

## Design
    For the React JS files - Victoria worked on the Manufacturer Form, ManufacturerList, and Automobile List. Nicolas created the Vehicle Models Form, Models list, and Automobile Form. 

    Create Bounded Countexts excalidraw to define our bounded contexts, aggregate roots, aggregates, entities, and value objects to plan how our microservices should be modeled. Attached in it's own BoundedContexts.png file. 

    Start with backend - create models and views for each microservice. We are using information from our Inventory microservice via poller to get automobile data into our microservice's automobile value object. Once we our backend is complete we will create the front end via React components. 

## Service microservice

Create a Technician model with the properties name and employee number, a Service Appointment model with the properties vin, owner name, date with DateField, time with TimeField, reason, finished BooleanField, vip BooleanField, and technician ForeignKey. An Automobile VO model will need to be created with a vin property to link to the inventory microservice and a poller.py file will be used to extract the data for use in the service microservice.

## Sales microservice

Create a SalesPerson model with the properties name and employee number, a Customer model with the properties name, address, and phone number, and a SaleRecord model with the properties automobile ForeignKey using automobilevo, salesperson ForeignKey, customer ForeignKey, and price. I will need to create an Automobile VO model to link to the SalesRecord model with a is sold property so I can mark the auto as sold after a record has been created so it is not able to be sold again. The automobile ForeignKey properties are tied to the inventory microservice will require a poller.py file to be able to extract the data for use in the sales microservice. 

