# Cash Register User Manual

Before you are able to operate the register, please make sure you have contacted
a manager about putting your credentials into the system. In case the program
is required to be restarted, the register url can be found at `http://localhost:1337`.

The first screen you will encounter is the login page, where you can enter
your employee credentials.
![Screenshot](screenshots/login.png)

If you accidently enter the wrong username and password combo, a message will
appear explaining the error. Once you have logged into the system, you will
see that there are two main sections of the interface, an array of buttons,
and a (most likely empty) area where items in a transaction will appear.
The button array will look like this:
![Screenshot](screenshots/buttons.png)

The buttons with items on them correspond to what a customer would like to purchase. Every
time you press one of the buttons, the quantity of the item being sold in the transaction
will go up by one. For instance, if a customer would like to purchase three sodas, you would
press the button labled "pop" three times. The logout button will log you out from the
system, but will save the items in the current transaction.

The other side of the screen will show the list of items. Here is what it looks like
when there are items in a transaction:
![Screenshot](screenshots/items.png)

Each item is actually a button you can press to remove that item (and all of its quantity)
from the current transaction. This is so that if you accidently press one of the earlier
buttons one too many times, you can just press the green button to remove it from the 
transaction and enter the correct amount without needing to restart the entire transaction.
The total for the transaction will appear below the list of transactions. If you would like
to cancel an entire transaction, you can press the "Void Transaction" button at the bottom
of the list so you can start over. Once you have finished a transaction, you should press
the "Complete Sale" button so that the transaction can be archived.

After you press the "Complete Sale" button, you will be greeted with this screen:
![Screenshot](screenshots/receipt.png)

The screen will display a preview of the receipt that will be printed for the customer.
The rest of the buttons on the register are hidden so that the receipt can't be altered after the transaction has already completed.
When you are satisfied that the details appear correct, you can press the "Print Receipt"
button at the bottom of the page. You might be wondering why the system itself 
can't verify that the reciept is properly formatted so you don't have to click extra
buttons, and the answer is that we don't pay our R&D division enough to think about these
kinds of things.

If for some reason the system encounters an error, it should display information
about it in red text in the bottom left hand corner of the screen.
![Screenshot](screenshots/error.png)

If it isn't obvious what is causing an error, we recommend contacting your manager or administrator.
