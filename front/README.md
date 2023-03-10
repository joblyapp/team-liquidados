
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

* ISSUE -> When changing password the Success component dont accept my setMode, so, it can't navigate to index page. SOLVED.

## Implement REMEMBER ME autocomplete.

* Save on Local Storage the information of email and password. DONE
- Add a new key on the USERDATA state. DONE

* Create REMEMBER ME checkbox. DONE

* Recover the REMEMBERED data from local storage if it exist. DONE.

* If fields are autocompleted the "remember" box has to be checked. DONE.

* If the user enters an autocompleted information but unchecked the box, then the information has to be erased. DONE

* Hide the upper bar when loggOut on PRODUCT and SALES pages. DONE.

## PRODUCT AND SALE CORRECTIONS

* Administrate the percentaje of viewport for "productList" class. IN PROCESS.


## CATEGORIES

* Droplist with posibility to write a new one. I send a "string" to the back-end.

## SESSION BAR

* Go to "/" when logging out! DONE.
* Modal to change USER information.

## PRODUCTS

* ISSUE: When creating a new product with no image it crash the server.

* Add the "$" logo to product price.
* Categories from back in the PRODUCTSBAR. DONE.
* Categories from back in the EDIT PRODUCT modal.


## SALES CSS

* Turn WIDTH to 85%. DONE.
* Round the PAGINATION BUTTONS. DONE.
* Show CALENDAR both disable and able. DONE.
* Change order between CALENDAR and DROPLIST. DONE.

* Change the columns names. DONE.
* Change the columns information. DONE.

* Add border radius to all inputs. 

* Add "rsuite" for datePicker


* Delete the EDIT SALES button. DONE.

* Add CHECKALL checkbox in the SaleBar component. DONE.
* Check all and uncheck all when clicking on CHECKALL box. DONE.
* ISSUE: When navigating on PAGINATION and it loads less than eight elements, the extra elements from previous pages just uncheck. SOLVED with a defaultChecked attribute.

* Create the STATE buttons. DONE.

* Create de CANCEL action button. DONE.

- Create the Modal to confirm and explain why. IN PROCESS.
- Reload page when some state changes. DONE.

* CANCEL modal

- Create the textarea. DONE.
- Don't allow resizing. DONE.
- Css to buttons. DONE.
- Close and reload when YES. DONE.
- Styling text. DONE.



ISSUE: when loading last month sales, it loads the sales of current month. I need to filter sales from las 30 days. SOLVED!

# CALENDAR
* Change the input date placeholder from "DD/MM/YYYY" to "FROM / TO". DONE.

# COMPLETING CANCEL SALES

* Send the user description when cancelling a sale. DONE.
* Dont allow to cancel when the sale is already cancelled. DONE.
* ISSUE: Alert modal doesn't work after using it one time. DONE.

## SALE SHOW

* I need a modal to show the sales information. DONE.

* IMPORTANT: Change SALESBAR to recieve an array instead of individual column names. DONE.

* Working on modal. DONE.

CSS
- Add background blur. DONE

- Need "go back" button. DONE.
- Need to see "Total Sale". DONE.
- ADD pay method. DONE.
- ADD Sale state. DONE.
- ADD sale number. DONE.

## EXPORT FUNCTION TO SALES

* Add the react-json-to-excel package. DONE

* Add the file-saver xlsx dependencie. DONE.

* Pass oldSales as prop to UpperBar component. DONE.

* Add OnClick function. DONE.

* How to know which items are checked? SOLVED!

-> First create an id for every checkbox. This id has to be equal to sale _id. DONE
-> Then i need to check all checked boxes and add the id to an array. DONE.
-> After that i need to filter all the information based on the IDs array. DONE.

* Export the selected Sales to a xlsx file. DONE

-> First i need to format the info and the headers. ISSUE: the changes i make to filteredSales JSON modifies the original data JSON. SOLVED! using a parse method to copy the original JSON.

<<<<<<<<<< IMPORTANT >>>>>>>>>>

## check boxes

-> ISSUE: the checkboxes reload when user change Pages of Pagination. CAN'T ACHIEVE A PERFECT COORDINATION BEETWEEN THE CHECKED BOOLEAN INSIDE THE OLDSALES STATE AND THE CHECKBOX ITSELF. SOLVED creating a control array with the id of checked boxes.

* Need to check all boxes when clicking the Bar checkbox. DONE


-> ISSUE: can't send the cancellation reason to the backend. DONE.

<<<<<<<<<< IMPORTANT >>>>>>>>>>

## Little Issues

* Show the cancelDescription on Show Sale component. DONE.

* Avoid the list of sales to load twice. DONE.

* Add the "no sales" component. DONE.

* Set the default calendar to the best date range. I think its LAST WEEK. DONE.



* CSS

- Date inputs. DONE.
- Add arrows to PAGINATION SELECT. DONE.
- English words to Spanish. DONE.
- ORDENAR button. DONE.
- Border radius. DONE.
- Nueva Venta styling. DONE.

* Functionalities

- Change ORDER of showed sales. DONE
- The TOTAL on ShowSale has too many decimal numbers and the addition is wrong. DONE.

- Make the PAGINATION NUMBERS shorter. DONE.

## PAGINATION fixes

* Not to resize when changing pages. DONE.
* The size is forced when the pages are too few. DONE

* Eliminate console.logs. DONE.