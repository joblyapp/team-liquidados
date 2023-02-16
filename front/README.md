
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

* I'm working on branch recovery. I went back from Simon's update. 


