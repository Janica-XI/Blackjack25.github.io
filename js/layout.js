/*
 * Custom Javascript/jQuery for blackjack game to modify layout behavior 
 */ 

$(function() {
    $('#debugSwitch').change(function() {
        $('#sec_debug').toggle()
    })
  })
  $('#sec_debug').hide()

  $( "button.close" ).on( "click", function() {
    $('#gameStatusModal').modal('hide'); 
  } );

  function updateBet(value) {
    // Update the displayed current bet value
    document.getElementById('currentBet').innerText = value;
}



// Example of showing the loading screen
function showLoading() {
    $('#loadingModal').modal('show');
}

// Example of hiding the loading screen
function hideLoading() {
    $('#loadingModal').modal('hide');
}

function triggerConfetti() {
  const duration = 5 * 1000; // Duration of the confetti effect in milliseconds
  const end = Date.now() + duration;

  // Generate confetti every 100ms until the duration ends
  (function frame() {

      // Stop if the duration has ended
      if (Date.now() < end) {
          confetti({
              particleCount: 5, // Number of confetti pieces
              angle: Math.random() * 360, // Random angle
              spread: 70, // Spread of confetti
              startVelocity: 45, // Initial velocity
              decay: 0.9, // Decay rate of the particles
              scalar: 1, // Size of the particles
              zIndex: 1056,
              colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb'], // Colors of the confetti
          });
          requestAnimationFrame(frame); // Call the frame function again
      }
  })();

}
