$(document).ready(function(){            //This function adds the class "large" to the products 
                                          //and adds the class "active" to the link within the clicked "largeGrid" element.
	$(".largeGrid").click(function(){											
    $(this).find('a').addClass('active');
    $('.smallGrid a').removeClass('active');
    
    $('.product').addClass('large').each(function(){											
		});						
		setTimeout(function(){
			$('.info-large').show();	
		}, 200);
		setTimeout(function(){

			$('.view_gallery').trigger("click");	
		}, 400);								
		
		return false;				
	});
	
	$(".smallGrid").click(function(){		        //The second function is triggered when the user clicks on an element with the class "smallGrid."
    $(this).find('a').addClass('active');     //removes the class "large"  -->See more in documentation
    $('.largeGrid a').removeClass('active');
    
		$('div.product').removeClass('large');
		$(".make3D").removeClass('animate');	
    $('.info-large').fadeOut("fast");
		setTimeout(function(){								
				$('div.flip-back').trigger("click");
		}, 400);
		return false;
	});		
	
	$(".smallGrid").click(function(){
		$('.product').removeClass('large');			
		return false;
	});
  
  
	
	
	$('.product').each(function(i, el){					

		// Lift card and show stats on Mouseover
		$(el).find('.make3D').hover(function(){
				$(this).parent().css('z-index', "20");
				$(this).addClass('animate');
				$(this).find('div.carouselNext, div.carouselPrev').addClass('visible');			
			 }, function(){
				$(this).removeClass('animate');			
				$(this).parent().css('z-index', "1");
				$(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
		});	
		
		// Flip card to the back side
		$(el).find('.view_gallery').click(function(){	
			
			$(el).find('div.carouselNext, div.carouselPrev').removeClass('visible');
			$(el).find('.make3D').addClass('flip-10');			
			setTimeout(function(){					
			$(el).find('.make3D').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
					$(el).find('.product-front, .product-front div.shadow').hide();															
				});
			}, 50);
			
			setTimeout(function(){
				$(el).find('.make3D').removeClass('flip90').addClass('flip190');
				$(el).find('.product-back').show().find('div.shadow').show().fadeTo( 90 , 0);
				setTimeout(function(){				
					$(el).find('.make3D').removeClass('flip190').addClass('flip180').find('div.shadow').hide();						
					setTimeout(function(){
						$(el).find('.make3D').css('transition', '100ms ease-out');			
						$(el).find('.cx, .cy').addClass('s1');
						setTimeout(function(){$(el).find('.cx, .cy').addClass('s2');}, 100);
						setTimeout(function(){$(el).find('.cx, .cy').addClass('s3');}, 200);				
						$(el).find('div.carouselNext, div.carouselPrev').addClass('visible');				
					}, 100);
				}, 100);			
			}, 150);			
		});			
		
		// Flip card back to the front side
		$(el).find('.flip-back').click(function(){		
			
			$(el).find('.make3D').removeClass('flip180').addClass('flip190');
			setTimeout(function(){
				$(el).find('.make3D').removeClass('flip190').addClass('flip90');
		
				$(el).find('.product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
					$(el).find('.product-back, .product-back div.shadow').hide();
					$(el).find('.product-front, .product-front div.shadow').show();
				});
			}, 50);
			
			setTimeout(function(){
				$(el).find('.make3D').removeClass('flip90').addClass('flip-10');
				$(el).find('.product-front div.shadow').show().fadeTo( 100 , 0);
				setTimeout(function(){						
					$(el).find('.product-front div.shadow').hide();
					$(el).find('.make3D').removeClass('flip-10').css('transition', '100ms ease-out');		
					$(el).find('.cx, .cy').removeClass('s1 s2 s3');			
				}, 100);			
			}, 150);			
			
		});				
	
		makeCarousel(el);
	});
	
	$('.add-cart-large').each(function(i, el){
		$(el).click(function(){
			let carousel = $(this).parent().parent().find(".carousel-container");
		  let  img = carousel.find('img').eq(carousel.attr("rel"))[0];						
			let position = $(img).offset();	

			let productName = $(this).parent().find('h4').get(0).innerHTML;				
	
			$("body").append('<div class="floating-cart"></div>');		
			let cart = $('div.floating-cart');		
			$("<img src='"+img.src+"' class='floating-image-large' />").appendTo(cart);
			
			$(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
			setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
			
			setTimeout(function(){
			$('div.floating-cart').remove();
			$("body").removeClass("MakeFloatingCart");


			let cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+img.src+"' alt='' /></div><span>"+productName+"</span><strong>$390 000</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";			

			$("#cart .empty").hide();			
			$("#cart").append(cartItem);
			$("#checkout").fadeIn(500);
			
			$("#cart .cart-item").last()
				.addClass("flash")
				.find(".delete-item").click(function(){
					$(this).parent().fadeOut(300, function(){
						$(this).remove();
						if($("#cart .cart-item").size() == 0){
							$("#cart .empty").fadeIn(500);
							$("#checkout").fadeOut(500);
						}
					})
				});
 		    setTimeout(function(){
				$("#cart .cart-item").last().removeClass("flash");
			}, 10 );
			
		}, 1000);
			
			
		});
	})
	
	/* ----  Image Gallery Carousel   ---- */
	function makeCarousel(el){
	
		
		let carousel = $(el).find('.carousel ul');
		let carouselSlideWidth = 315;
		let carouselWidth = 0;	
		let isAnimating = false;
		let currSlide = 0;
		$(carousel).attr('rel', currSlide);
		
		// building the width of the casousel
		$(carousel).find('li').each(function(){
			carouselWidth += carouselSlideWidth;
		});
		$(carousel).css('width', carouselWidth);
		
		// Load Next Image
		$(el).find('div.carouselNext').on('click', function(){
			let currentLeft = Math.abs(parseInt($(carousel).css("left")));
			let newLeft = currentLeft + carouselSlideWidth;
			if(newLeft == carouselWidth || isAnimating === true){return;}
			$(carousel).css({'left': "-" + newLeft + "px",
								   "transition": "300ms ease-out"
								 });
			isAnimating = true;
			currSlide++;
			$(carousel).attr('rel', currSlide);
			setTimeout(function(){isAnimating = false;}, 300);			
		});
		
		// Load Previous Image
		$(el).find('div.carouselPrev').on('click', function(){
			let currentLeft = Math.abs(parseInt($(carousel).css("left")));
			let newLeft = currentLeft - carouselSlideWidth;
			if(newLeft < 0  || isAnimating === true){return;}
			$(carousel).css({'left': "-" + newLeft + "px",
								   "transition": "300ms ease-out"
								 });
			isAnimating = true;
			currSlide--;
			$(carousel).attr('rel', currSlide);
			setTimeout(function(){isAnimating = false;}, 300);						
		});
	}
	
	$('.sizes a span, .categories a span').each(function(i, el){
		$(el).append('<span class="x"></span><span class="y"></span>');
		
		$(el).parent().on('click', function(){
			if($(this).hasClass('checked')){				
				$(el).find('.y').removeClass('animate');	
				setTimeout(function(){
					$(el).find('.x').removeClass('animate');							
				}, 50);	
				$(this).removeClass('checked');
				return false;
			}
			
			$(el).find('.x').addClass('animate');		
			setTimeout(function(){
				$(el).find('.y').addClass('animate');
			}, 100);	
			$(this).addClass('checked');
			return false;
		});
	});
	
	$('.add_to_cart').click(function(){
		let productCard = $(this).parent();
		let position = productCard.offset();
		let productImage = $(productCard).find('img').get(0).src;
		let productName = $(productCard).find('.product_name').get(0).innerHTML;				

		$("body").append('<div class="floating-cart"></div>');		
		let cart = $('div.floating-cart');		
		productCard.clone().appendTo(cart);
		$(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
		setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
		setTimeout(function(){
			$('div.floating-cart').remove();
			$("body").removeClass("MakeFloatingCart");


			let cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+productImage+"' alt='' /></div><span>"+productName+"</span><strong>$390 000</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";			

			$("#cart .empty").hide();			
			$("#cart").append(cartItem);
			$("#checkout").fadeIn(500);
			
			$("#cart .cart-item").last()
				.addClass("flash")
				.find(".delete-item").click(function(){
					$(this).parent().fadeOut(300, function(){
						$(this).remove();
						if($("#cart .cart-item").size() == 0){
							$("#cart .empty").fadeIn(500);
							$("#checkout").fadeOut(500);
						}
					})
				});
 		    setTimeout(function(){
				$("#cart .cart-item").last().removeClass("flash");
			}, 10 );
			
		}, 1000);
	});
});



function Sliders(o) {                  //It takes an object o as an argument that contains various properties and values to control the slider's behavior.
  "use strict";                        //The properties are:time,autoTime,selector, see more in documentation.
  let time = o.time || 500,
      autoTime = o.autoTime || 5000,
      selector = o.selector,
      width_height = o.width_height || 100 / 70,
      sliders = document.querySelectorAll(selector),
      i;
  function css(elm, prop, val) {
    elm.style[prop] = val;
    prop = prop[0].toUpperCase() + prop.slice(1);
    elm.style["webkit" + prop] = elm.style["moz" + prop] =
      elm.style["ms" + prop] = elm.style["o" + prop] = val;
  }
  function anonimFunc(slider) {
    let buttonLeft = slider.children[2],
        buttonRight = slider.children[1],
        ul = slider.children[0],
        li = ul.children,
        activeIndex = 0,
        isAnimate = false,
        i,
        s;
    ul.style.paddingTop = (100 / width_height) + "%";
    for (i = 0; i < li.length; i += 1) {
      css(li[i], "animationDuration", time + "ms");
    }
    li[activeIndex].classList.add("active");
    function left() {
      if (isAnimate) {return; }
      clearTimeout(s);
      isAnimate = true;
      let nextIndex = (activeIndex < li.length - 1) ? (activeIndex + 1) : (0);
      li[nextIndex].classList.add("next");
      li[activeIndex].classList.add("left");
      li[nextIndex].classList.add("active");
      setTimeout(function () {
        li[activeIndex].classList.remove("active");
        li[activeIndex].classList.remove("left");
        li[nextIndex].classList.remove("next");
        li[nextIndex].classList.add("active");
        activeIndex = nextIndex;
        isAnimate = false;
        s = setTimeout(left, autoTime);
      }, time);
    }
    function right() {
      if (isAnimate) {return; }
      clearTimeout(s);
      isAnimate = true;
      let nextIndex = (activeIndex > 0) ? (activeIndex - 1) : (li.length - 1);
      li[nextIndex].classList.add("previous");
      li[activeIndex].classList.add("right");
      li[nextIndex].classList.add("active");
      setTimeout(function () {
        li[activeIndex].classList.remove("active");
        li[activeIndex].classList.remove("right");
        li[nextIndex].classList.remove("previous");
        li[nextIndex].classList.add("active");
        activeIndex = nextIndex;
        isAnimate = false;
        s = setTimeout(right, autoTime);
      }, time);
    }
    buttonLeft.addEventListener("click", left);
    buttonRight.addEventListener("click", right);
    s = setTimeout(right, autoTime);
  }
  for (i = 0; i < sliders.length; i += 1) {
    anonimFunc(sliders[i]);
  }
}


/* -- how to use it ? -- */
let sliders = new Sliders({      // It is an instance of the Sliders function with specified properties. 
  selector: ".slider",           //See more in documentation.
  time: 500,
  autoTime: 3000,
  width_height: 350 / 250
});









/*LOAN CALC, method with querySelector(method only returns the first element that matches the specified selectors) */

const loanAmountInput = document.querySelector(".loan-amount");   // It sets the initial values of loan amount, interest rate, and loan tenure based on the values of inputs taken from the user 
const interestRateInput = document.querySelector(".interest-rate"); //defines the inputs and display elements for a loan calculator.   
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);  //parses string into  floating number
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;

let myChart;

const checkValues = () => {    //function checks the values entered by the user in the loan amount, interest rate, and loan tenure input fields. 
  let loanAmountValue = loanAmountInput.value;    
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "ERORR";    //Message after wrong input
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = " ONLY";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "NUM VALUE";
  }
};

const displayChart = (totalInterestPayableValue) => {             //This is a function that creates  to display the split between the "Total Interest" and "Principal Loan Amount". 
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};



const refreshInputValues = () => {                //This code updates the values of loanAmount, interestRate, loanTenure, and interest variables.
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const calculateEMI = () => {           //it calculates the EMI using the formula,details in documetnatiopn.
  checkValues();
  refreshInputValues();
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi); //rounds the number to its nearest integer,
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);                     //when it's clicked, the init function will be called and the values will be updated.
};

init();

calculateBtn.addEventListener("click", init);

/*----------------------------------------------------------------------------------------- */


/*Sing up form,submit-btn open new URL,combination of getElement method with ID and Class */


const form = document.getElementById('form');         //defining variables that represent the elements on an HTML form by their id values.
const username = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

form.addEventListener('submit', (event) =>{
    event.preventDefault();                      //the event listener will be triggered and prevent the default behavior of the submit event. It will then invoke a function called "Validate". 

    Validate();
})


const sendData = (usernameVal, sRate, Count) => {
    if(sRate === Count){                                //function compares the value of sRate and Count.
        window.location.href = 'https://sportklub.com/'; 
    }
}

const SuccessMsg = (usernameVal) => {                         //compare value and return state
    let formContr = document.getElementsByClassName('form-control');
  let Count = formContr.length - 1;
    for(let i = 0; i < formContr.length; i++){
        if(formContr[i].className === "form-control success"){
            let sRate = 0 + i;
            console.log(sRate);
            sendData(usernameVal, sRate, Count);
        }
        else{
            return false;
        }
    }
}


const isEmail = (emailVal) =>{            //The function isEmail takes an input parameter emailVal which is a string representing an email address.
    let atSymbol = emailVal.indexOf('@');
    if(atSymbol < 1) return false;
    let dot = emailVal.lastIndexOf('.');
    if(dot <= atSymbol + 2) return false;
    if(dot === emailVal.length -1) return false;
    return true;
}

function Validate(){                      //The Validate function is used to validate the user inputs in a form.
    const usernameVal = username.value.trim();//eliminates leading and trailing spaces
    const lastnameVal = lastname.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    //username
    if(usernameVal === ""){
        setErrorMsg(username, 'first name cannot be blank');
    }
    else if(usernameVal.length <=2){
        setErrorMsg(username, 'min 3 char');
    }
    else{
        setSuccessMsg(username);
    }

    //last name

    if(lastnameVal === ""){
        setErrorMsg(lastname, 'last name cannot be blank');
    }
    else if(lastnameVal.length <=2){
        setErrorMsg(lastname, 'min 3 char');
    }
    else{
        setSuccessMsg(lastname);
    }

    //email
    if(emailVal === ""){
        setErrorMsg(email, 'email cannot be blank');
    }
    else if(!isEmail(emailVal)){
        setErrorMsg(email, 'email is not valid');
    }
    else{
        setSuccessMsg(email);
    }

    //password
    if(passwordVal === ""){
        setErrorMsg(password, 'password cannot be blank');
    }
    else if(passwordVal.length <= 7){
        setErrorMsg(password, 'min 8 char');
    }
    else{
        setSuccessMsg(password);
    }

    //confirm password
    if(cpasswordVal === ""){
        setErrorMsg(cpassword, 'confirm password cannot be blank');
    }
    else if(passwordVal != cpasswordVal){
        setErrorMsg(cpassword, 'Not Matched!');
    }
    else{
        setSuccessMsg(cpassword);
    }
    SuccessMsg(usernameVal);


}

function setErrorMsg(input, errormsgs){       //set method in JS can hold any value of any data type.
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input){              //The parent element's class is set to "form-control success". 
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}


