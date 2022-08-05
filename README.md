# CarCar

Team:

* Person 1 - Nicolas Asparria - Automobile Service
* Person 2 - Victoria Ziegler - Auto Sales

## Design
For the React JS files - Victoria worked on the Manufacturer Form, ManufacturerList, and Automobile List. Nicolas created the Vehicle Models Form, Models list, and Automobile Form. 

Create Bounded Countexts excalidraw to define our bounded contexts, aggregate roots, aggregates, entities, and value objects to plan how our microservices should be modeled. Attached in it's own BoundedContexts.png file. 

Start with backend - create models and views for each microservice. We are using information from our Inventory microservice via poller to get automobile data into our microservice's automobile value object. Once we our backend is complete we will create the front end via React components. 

For more information abut the design of the project, please reference BoundedContexts.png where you will be able to see our logic in a graphic perspective.


## Service microservice

* Create a Technician model with the properties name and employee number, so then be able to create the TechnicianForm. Double check on Insomnia if I can create a technician and how i will be able to assign it to a service (id? key? name? number?)
* Create a Service Appointment model with the properties vin, owner name, date with DateField, time with TimeField, reason, finished BooleanField, vip BooleanField, and technician ForeignKey. Be able to connect them to the poller to use the automobiles we have in the inventory, through their VIN.
* An Automobile VO model will need to be created with a vin property to link to the inventory microservice and double check if the Automobiles i have in the poller are the same as the VOs ones.
* A poller.py file will be used to extract the data for use in the service microservice.
* Create a service appointment list where it displays all of our pending service appointments and also where our personal can hit the "cancel" button if for some reason they have to cancel the appointment, a "finished" button to set the condition of finished in the database to true. While doing this, it will no longer render in the page but keep it in the database.
* Create a page where our workers can search for all of the service appointments to a speficic vehicle (by their vin)
* Add the links of all the services and form to the navbar so they can be displayed by our personal. 

## Sales microservice

Create a SalesPerson model with the properties name and employee number, a Customer model with the properties name, address, and phone number, and a SaleRecord model with the properties automobile ForeignKey using automobilevo, salesperson ForeignKey, customer ForeignKey, and price. I will need to create an Automobile VO model to link to the SalesRecord model with a is sold property so I can mark the auto as sold after a record has been created so it is not able to be sold again. The automobile ForeignKey properties are tied to the inventory microservice will require a poller.py file to be able to extract the data for use in the sales microservice. 

