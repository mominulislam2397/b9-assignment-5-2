document.addEventListener("DOMContentLoaded", function () {
  const seats = document.querySelectorAll(".add-btn button"); 
  const selectedSeatsContainer = document.getElementById("selected-seats");
  const selectedSeatCount = document.getElementById("selected-seat");
  const totalPriceContainer = document.getElementById("total-price")
  const grandTotalContainer = document.getElementById("grand-total-display");
  const seatsLeftContainer = document.getElementById("seats-left");
  let seatsLeft = parseInt(seatsLeftContainer.textContent, 10);

  const applyButton = document.querySelector('.apply-button');
  const couponInput = document.querySelector('input[type="text"]');
  const couponMessage = document.getElementById("coupon-message");

  const nameInput = document.querySelector('input[placeholder="Your Name"]');
  const nextButton = document.querySelector('.btn-success'); 

  const maxSeats = 4;
  const seatPrice = 550;
  let selectedSeats = [];
  let totalPrice = 0;

 // Modal open
 const successModal = document.getElementById("success-modal");
 const closeModalButton = document.getElementById("close-modal");




  // Function to update the "Next" button 
  function updateNextButtonState() {
    if (selectedSeats.length > 0 || nameInput.value.trim() !== "") {
      nextButton.disabled = false;
      nextButton.classList.remove('btn-disabled', 'bg-gray-300');
      nextButton.classList.add('btn-success', 'bg-green-500');
    } else {
      nextButton.disabled = true;
      nextButton.classList.remove('btn-success', 'bg-green-500');
      nextButton.classList.add('btn-disabled', 'bg-gray-300');
    }
  }

  

  seats.forEach(seat => {
    seat.addEventListener("click", function () {
      const seatNumber = seat.textContent.trim(); 

      if (seat.classList.contains("bg-green-500")) {
        // Deselect seat
        seat.classList.remove("bg-green-500");
        seat.classList.add("bg-gray-300");
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
        totalPrice -= seatPrice;
        seatsLeft += 1; 
        removeSeatFromDisplay(seatNumber);
      } else {
        if (selectedSeats.length < maxSeats && seatsLeft > 0) {
          // Select seat
          seat.classList.remove("bg-gray-300");
          seat.classList.add("bg-green-500");
          selectedSeats.push(seatNumber);
          totalPrice += seatPrice;
          seatsLeft -= 1;
          displaySeat(seatNumber);
        } else if(seatsLeft === 0){
          couponMessage.textContent = "No more seats available";
        } else {
          couponMessage.textContent = `You can select a maximum of ${maxSeats} seats.`;
        }
      }

      // Update apply button state
      if (selectedSeats.length >= 4) {
        applyButton.disabled = false;
        applyButton.classList.remove('btn-disabled', 'bg-gray-300');
        applyButton.classList.add('btn-success', 'bg-green-500');
      } else {
        applyButton.disabled = true;
        applyButton.classList.remove('btn-success', 'bg-green-500');
        applyButton.classList.add('btn-disabled', 'bg-gray-300');
      }

      // Update selected seat count and total price
      selectedSeatCount.textContent = selectedSeats.length;
      totalPriceContainer.textContent = `${totalPrice}`;
      grandTotalContainer.textContent = `${totalPrice}`;
      seatsLeftContainer.textContent = seatsLeft;

      // Update the "Next" button state
      updateNextButtonState();
    });
  });

  // Update "Next" button when the name input changes
  nameInput.addEventListener("input", updateNextButtonState);

  applyButton.addEventListener("click", function () {
    const couponCode = couponInput.value.trim();

    if (couponCode === "NEW15") {
      const discount = totalPrice * 0.15; 
      const grandTotal = totalPrice - discount;
      grandTotalContainer.textContent = `${grandTotal.toFixed(2)}`;
      couponMessage.textContent = `15% discount applied! Successed`;
      // Disable apply button after applying the valid coupon
      applyButton.disabled = true;
      applyButton.classList.remove('btn-success', 'bg-green-500');
      applyButton.classList.add('btn-disabled', 'bg-gray-300');
    } else if (couponCode === "Couple20") {
      const discount = totalPrice * 0.20; 
      const grandTotal = totalPrice - discount;
      grandTotalContainer.textContent = `${grandTotal.toFixed(2)}`;
      couponMessage.textContent = `20% discount applied! Successed`;
      // Disable apply button after applying the valid coupon
      applyButton.disabled = true;
      applyButton.classList.remove('btn-success', 'bg-green-500');
      applyButton.classList.add('btn-disabled', 'bg-gray-300');
    } else {
      couponMessage.textContent = "Invalid coupon code. Please enter a valid code.";
      // Do not disable the apply button if the coupon code is invalid
      applyButton.disabled = false;
    }
  });

     // Show success modal when "Next" button is clicked
  nextButton.addEventListener("click", function () {
    if (!nextButton.disabled) {
      successModal.classList.remove("hidden");
    }
  });

  // Close modal when "OK" button is clicked
  closeModalButton.addEventListener("click", function () {
    successModal.classList.add("hidden");
  })


  // Show success modal when "Next" button is clicked
nextButton.addEventListener("click", function () {
  if (!nextButton.disabled) {
    successModal.classList.remove("hidden");
    // Disable the Next button after the modal is shown
    nextButton.disabled = true;
    nextButton.classList.remove('btn-success', 'bg-green-500');
    nextButton.classList.add('btn-disabled', 'bg-gray-300');
  }
});

  

  // Initialize the button state
  updateNextButtonState();

  // Functions to display and remove selected seats
  function displaySeat(seatNumber) {
    const seatItem = document.createElement("div");
    seatItem.classList.add("flex", "justify-between");
    seatItem.innerHTML = `
      <p class="text-gray-500">${seatNumber}</p>
      <p class="text-gray-500">Economy</p>
      <p class="text-gray-500">${seatPrice}</p>
    `;
    seatItem.setAttribute("data-seat", seatNumber);
    selectedSeatsContainer.appendChild(seatItem);
  }

  function removeSeatFromDisplay(seatNumber) {
    const seatItem = selectedSeatsContainer.querySelector(`[data-seat="${seatNumber}"]`);
    if (seatItem) {
      seatItem.remove();
    }
  }
});
