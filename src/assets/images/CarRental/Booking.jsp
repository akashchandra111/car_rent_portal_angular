<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Booking Page: Rento Car</title>
      <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!-- Compiled and minified CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">  
</head>
<body>
	<div class="navbar-fixed">
         <nav class="nav-wrapper indigo darken-3">
            <div class="container">
               <a class="sidenav-trigger" href="#" data-target="menu-link">
               <i class="material-icons">menu</i>
               </a>
               <div class="brand-logo">
                  <a href="#">
                  RentoCar
                  </a>
               </div>
               <ul class="right hide-on-med-and-down">
                  <li>
                     <a href="Wallet.html" class="waves-effect waves-dark modal-trigger">Wallet</a>
                  </li>
                  <li>
                     <a href="History.html" class="waves-effect waves-dark modal-trigger">History</a>
                  </li>
                  <li>
                     <a href="#about" class="waves-effect waves-dark modal-trigger">Your Bookings</a>
                  </li>

                  <li>
                      <a class="dropdown-trigger" href="#!" data-target="dropdown1" data-beloworigin="true">User Profile</a>
                  </li>
                    <ul id="dropdown1" class="dropdown-content">
                        <li><a href="#!" class="indigo-text darken-3"><i class="material-icons indigo-text darken-3">account_circle</i>Profile</a></li>
                        <li><a href="#!" class="indigo-text darken-3"><i class="material-icons indigo-text darken-3">exit_to_app</i>Logout</a></li>
                    </ul>
                          
                  </li>
               </ul>
            </div>
         </nav>
      </div>
      <!-- Side Navigation for mobile devices -->
      <ul class="sidenav" id="menu-link">
         <li>
            <a href="#wallet" >Wallet</a>
         </li>
         <li>
            <a href="#history">History</a>
         </li>
         <li>
            <a href="#about">YourBookings</a>
         </li>
      </ul><!------Side Navigation ends here----->


      <div class="container">
            <h3 class="indigo-text darken-3">Book Car</h3>
         
          <div class="row"><!-----Displaying Selected car----->
              <div class="col s4 m4 ">
                    <div class="card indigo darken-3">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="images/car.jpg">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator white-text text-darken-4">Redi-GO<i class="material-icons right">more_vert</i></span>
                            <div class = "card-action">  
                                <button class = "btn waves-effect waves-light white"> 
                                <a class = "black-text" href = "home.html">Change your car</a> 
                                </button>  
                            </div>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title black-text text-darken-4">Car Information<i class="material-icons right">close</i></span>
                            <p>22.7kmpl Milage limit, Fuel type-Petrol</p>
                            <p> It packs a Bluetooth-enabled audio system that offers hands-free calling and music streaming, central locking, manual AC, LED daytime running lights and more. For safety, it gets only ABS with EBD as standard since the driver airbag is limited to the top-spec S variant only. It is white in colour and 4seater.</p>
                        </div>
                    </div>
              </div><!-----Closing the card-------->

              <div class="col s8 m8 "><!------Opening the form------->
                    <div class="booking-form">
                        <div class="input-field">
                            <input type="text" id="autocomplete-input" class="autocomplete">
                            <label for="autocomplete-input black-text darken-3">Origin City</label>
                          </div>
                                            
                          <div class="input-field">
                            <input type="text" id="autocomplete-input" class="autocomplete">
                            <label for="autocomplete-input">Delivery City</label>
                          </div>

                        <div>
                          <div class="input-field col s6">
                            <input type="text" id="date-picker1" class="validate datepicker">
                            <label for="date-picker1">Start Date</label>
                          </div>

                          <div class="input-field col s6">
                            <input type="text" id="time-picker1" class="validate timepicker">
                            <label for="time-picker1">Start Time</label>
                          </div>
                        </div>

                        <div>
                          <div class="input-field col s6">
                            <input type="text" id="date-picker2" class="validate datepicker">
                            <label for="date-picker2">End Date</label>
                          </div>

                          <div class="input-field col s6">
                            <input type="text" id="time-picker2" class="validate timepicker">
                            <label for="time-picker2">End Time</label>
                          </div>
                        </div>
                        <div>
                            <h4><p class="Get-Price">Cost:
                            <label for="Get-Price">Rs </label></p></h4>
                            <a class="waves-effect waves-light btn indigo darken-3 right">Proceed to pay</a>
                        
                        </div> 
                        
                    </div>
              </div><!-------Closing the form-------->
          </div>
      </div>    

      <!----Footer------>
         <div class="footer-copyright indigo lighten-4" style="padding-top: 20px; padding-bottom: 1px;">
            <div class="container">
               <div class="row">
                  <div class="col">
                     &copy RentoCar 2018-2019
                  </div>
                  <div class="col right">
                     <a href="#!" class="">Contact Us</a>
                  </div>
               </div>
            </div>
         </div>
      </footer>

       <!-- JQuery -->
      <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      <!-- Compiled and minified JavaScript -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      <!-- Initializing all the materialize elements -->
      <script type="text/javascript">
         $(document).ready(
          ()=>  {
            // Sidenav initialization
                    $('.sidenav').sidenav();
            // Slider initialization and params setting
            $('.slider').slider(
              {
                indicators: false,
                height: 450,
                interval: 3000
              }
            );
            // Modal initialization
            $('.modal').modal();
            // Form initialization
            $('select').formSelect();
            // $('.datepicker').datepicker();
            // $('.timepicker').timepicker();
                }

         );
         //User profile Drop down
         $(".dropdown-trigger").dropdown();

         //Time picker
        $(document).ready(function(){
            $('.timepicker').timepicker();
        });

        //Date picker
        $(document).ready(function(){
            $('.datepicker').datepicker();
        });
      
      </script>
</body>
</html>