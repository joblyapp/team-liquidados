
- Chequear si existe USUARIO ADMIN
- JWT token


// ADDING SALES VISUAL

* Added products list DONE
* Quantity edition DONE
* ADD product button DONE
* DELETE product button DONE

// ADDING OLD SALES

* Added Old sales VISUAL
* Added Old sales EDITING mode

// TO DO

* We need to inform the user when a sale or product is registering ok or not


CREATED AN .ENV FILE



## NOW

* Create the STATS VISUAL. DONE
* Success message when sucribing a New Sale. DONE?


## Last PR
* Stats VISUAL already done. You can choose from the option list and the app will set automatically the calendar
* Need to change the URLS to the env variable. DONE

## TODAY

* Correct routes to Sales

* Adding Fail MESSAGES to LogIn. DONE
* Adding Fail MESSAGES to Products. 
* Adding Fail MESSAGES to Sales. 
* Adding BACK button on Register and Recovery. DONE


* Erase TOKEN when loging out. DONE
* Create RECOVER component and be prepared to implement with token
* Add link to "/" when clicking the LOGO. DONE


## 13/02

* Sales format correction. List of issues:

** Can't register a new sale. DONE
** Can't get old sales error "Cannot populate path `products.productId` because it is not in your schema. Set the `strictPopulate` option to false to override." SOLVED

* Adding LOADER for Loading component. DONE


## To do

* Add a message when products number is 0. "No se encontraron productos. Haga click en AGREGAR PRODUCTO para añadir un nuevo producto". DONE.

* Add category filter. DONE        

* Change SCROLL MODE to PAGES MODE.

* Change columns info. DONE

* Add IMAGE to a product. DONE.

* Succes MESSAGGE for NEW PRODUCT and EDIT PRODUCT. DONE

* WINDOWS EFFECT to ADD PRODUCT and EDIT PRODUCT component. DONE but i have an error. Its working with a Warning. NOT WARNING ANY MORE! DONE.


# ------------------------------------------------------------------------------------------

## TO DO


RECOVER

* Check if recovery MAIL works correctly. DONE
* Add LOADING wheel before recieving Succeded Messagge. DONE

* Create ROUTE to mail's LINK. DONE
* Load CHANGE PASSWORD component. DONE
* POST new password to back

* Create success message / fail message. DONE

EXTRAS

* "Show Password" button. DONE



SALES

* Correct loading bug. DONE.
* Sales still using the "productId" way at the back.

* Loading Products bug. DONE
* Check if adding product when it already exists works fine. DONE
* Searching PRODUCT by name and Category. DONE 
/// It was ticky because inside the "confirmAlert" windows i was not able to dinamically rerender the product list. I needed to create a new Component containing all the search but DONE
* Increacing or decrease PRODUCT quantity. DONE

* Not to delete product when quantity is "0". Just dont allow it and create a DELETE button.


REGISTERING SALE

* Completing all fields: 
---- Need PRODUCTS array with "name, price, quantity", A TOTAL sale, PAY METHOD, ISCANCELLED= false. I NEED TO KNOW THE CORRECT FORMAT TO SEND paymentForm


PRODUCT

CATEGORY- How to add new category
PRICE - Formatt to $******

VISUAL order and options.




OLD SALES

- Convert OLD SALES in STATISTICS


## IMPORTANT

* I'm working on branch recovery. I went back from Simon's update. DONE.

# PAGINATION

* Filter data after fetching it. DONE.
* Filter data with onPage criterium (max 8). DONE
* Create a PAGINATION LIST component. DONE.
* Create PAGINATION SELECT. DONE.
* Check if its works properly. DONE.

ISSUE => When page is selected and the input or category changes, it must be resetted to 1. DONE.


# SALES CORRECTIONS

* Editing an old Sale generates an error. 
* Changing Old Sale's PRODUCT QUANTITY generates an error.
* Registering changes in Old Sale generates an error.

ANOTACIONES---->>>> Necesito definir claramente la estructura de cada venta y de cada producto. En la sección NUEVA VENTA estoy trabajando con la siguiente esctructura:

-> VENTA [
    0: [
        products: {name:
                    category:
                    id:
                    ...
                  }
        total: f()
    ]
]

-> Del BACK yo recibo:

{
    date:
    isCancelled:
    products: [
        {name, price, quantity, ...},
        {name, price, quantity, ...},
        {name, price, quantity, ...}
    ]
    total:
    _id:
}

Necesito convertir lo que recibo en lo que maneja VENTAS.

I still get error when PATCH to OLD SALE by ID. I have to check what i'm sending to backend. SOLVED!


## Products

* Implement the image upload input and send the data correctly to backend.

- New Sale: I need an input that allows me to upload and image. DONE.
- Need an image for that input. DONE.
- Need that image to change when upload a new one. DONE.
- Need to send the data correctly to the back. DONE.

- Old Sale: I need to bring the image to the front. DONE.
- Need to send the changes correctly to the back. 

PATCH IS NOT REALLY CHANGING NOTHING!! FUCK! FUCK! FUCK!


## TODAY 22/2

* Resolve the PATCH issue. I need Simon on this. DONE


# Sales

* Delete the OLD SALES / NEW SALES selection page. I has to go directly to OLD SALES.  DONE.
- When Submitting Changes it goes back to Sale SELECTION page. SOLVED.

DONE.

* Add PAGINATION to SALES. DONE.

* Add CALENDAR and DROPLIST to filter Old Sales. DONE.

* Create Upper Bar for SALES. DONE.

# TODAY 23/02

## Login Visual

* For the "remember me" checkbox: The token should be eternal?

* Clone the dashboard created by Nicky. DONE.

* ISSUE -> When changing password the Success component dont accept my setMode, so, it can't navigate to index page.