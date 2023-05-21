
// target the profile display button to be used later
let profile_display_btn = document.querySelector('.profile-board-btn');

// target the form container
let form_container = document.querySelector('.form-container')

// target the get started button
let get_started_btn = document.querySelector('.get-started-btn');

// add event listener to the get started btn
get_started_btn.addEventListener('click', (event)=>{
    event.preventDefault()
    // display the form container
    form_container.style.display = "flex"
    get_started_btn.style.display = "none"
  
})


// target the close btn for form container
let close_form_container = document.querySelector('.close-form-container');

// add event listener to close-form-container btn
close_form_container.addEventListener('click', (event)=>{
       event.preventDefault();
       form_container.style.display = "none"
       get_started_btn.style.display = "flex"
})


// upload_logic
let file  = document.querySelector('#file');
let profile_img = document.querySelector('.photo')
let upload_img = ""
file.addEventListener('change', (event)=>{
       event.preventDefault();
       let chosenFile = file.files[0];
       if(chosenFile){
            // create file reader object
            let reader = new FileReader();
            // add load event to reader to determine when to start reading
            reader.addEventListener('load', (event)=>{
                     event.preventDefault()

                    // set the read result as the src value of our profile image 
                    profile_img.src = reader.result;
                    upload_img = reader.result
                     
            })

            //   read the reader's result as url
            reader.readAsDataURL(chosenFile)
       }
})





// target score board balance 
let profile_board_balance = document.querySelector('.balance')

// target the signup form to extract all the inputed values
let signup_form = document.querySelector('.signup-form');

// add submit event listener to it
signup_form.addEventListener('submit', (event)=>{
       event.preventDefault();
       let username = document.querySelector('.username').value
       let email= document.querySelector('.email').value
       let phone = document.querySelector('.phone').value
       let balnce_input = document.querySelector('.balance-input').value

       if(username === ''){
           document.querySelector('.username').classList.add('shake')
           setTimeout(()=>{
            document.querySelector('.username').classList.remove('shake')
           }, 1000)
       }else{
            if(balnce_input === ''){
                document.querySelector('.balance-input').classList.add('shake')
                setTimeout(()=>{
                document.querySelector('.balance-input').classList.remove('shake')
                }, 1000)
            }else{

                //    target the profile image src in the profile board
               document.querySelector('.board-profile-img').src = upload_img

              // target the username  in the profile board
              document.querySelector('.profile-name').textContent = username
    
             // target the balance on the profile board
             profile_board_balance.textContent = balnce_input
    
      
        // show the profile display btn
        profile_display_btn.style.display = "flex";
        form_container.style.display = "none"
            }
       }

       

    

})


// target profile board
let profile_board = document.querySelector('.profile-board')
// target the close btn for profile board container
let close_profile_board= document.querySelector('.close-profile-board');

// add event listener to close profile-board-btn
close_profile_board.addEventListener('click', (event)=>{
       event.preventDefault();
       profile_board.style.display = "none"
      
})


// logic to show the profile board when show profile button is being clicked.
profile_display_btn.addEventListener('click', (event)=>{
     event.preventDefault()
     profile_board.style.display = "flex"
    profile_board.style.zIndex = 100000
})


// close game-env buton logic
let close_gane_env_btn = document.querySelector('.close-game-env');

// target the game environment
let game_env = document.querySelector('.gameEnvironment');

// add event listener to the close game env button
close_gane_env_btn.addEventListener('click', ()=>{
        game_env.style.display = "none"
})


// target the place bet button inside the profile board
let place_bet_btn = document.querySelector('.board-place-bet');
place_bet_btn.addEventListener('click', (event)=>{
    //  display the game environment
    document.querySelector('.gameEnvironment').style.display = "flex"
    document.querySelector('.gameEnvironment').style.zIndex = 1000
    document.querySelector('.profile-board').style.display = "none"
})


// close result container logic
let close_result_btn = document.querySelector('.close-result-container');

// target the result container
let result_container = document.querySelector('.result');

// add event listener to the close result btn
close_result_btn.addEventListener('click', ()=>{
      result_container.style.display = "none"
})



// PLAY GAME LOGIC STARTS HERE
// get the bet amount
let bet_amount = document.querySelector('.bet-amount');

// get the play button
let play_btn = document.querySelector('.play-btn');

play_btn.addEventListener('click', (event)=>{
     event.preventDefault();
     let net_balance = Number(profile_board_balance.textContent) - bet_amount.value
     profile_board_balance.textContent = net_balance;

    result_container.style.display = "flex";
    game_env.style.display = "none"

    // logic to generate random balls
    let lucky_balls_array = [];
    let player_balls_array = [];

    // target lucky balls span
    let lucky_balls_span = document.querySelector('.lucky-balls-container');
    lucky_balls_span.innerHTML = ''

     // target player balls span
     let player_balls_span = document.querySelector('.player-balls-container');
     player_balls_span.innerHTML = ''

    //  generating the  random balls

    for(let i=0; i<5; i++){
           let lucky_ball = Math.floor(Math.random() * 99) + 1 // 1-99
           if(!lucky_balls_array.includes(lucky_ball)){
               lucky_balls_array.push(lucky_ball)
           }else{
               if(lucky_ball < 99){
                    lucky_ball = lucky_ball + 1
                    lucky_balls_array.push(lucky_ball)
               }else{
                     lucky_ball = lucky_ball - 2 + 1
                     lucky_balls_array.push(lucky_ball)
               }
           }

           let player_ball = Math.floor(Math.random() * 99) + 1
           if(!player_balls_array.includes(player_ball)){
            player_balls_array.push(player_ball)
        }else{
            if(player_ball < 99){
                 player_ball = player_ball + 1
                 player_balls_array.push(player_ball)
            }else{
                  player_ball = player_ball - 2 + 1
                  player_balls_array.push(player_ball)
            }
        }
    }


    // create a counter 
      let counter  = 0;
      let i_won = false;

     // populating the  lucky ball span and player ball span
    //  lucky ball span
    lucky_balls_array.forEach((ball)=>{
            let ball_span = document.createElement('span');
            ball_span.innerHTML = ball;
            ball_span.classList.add('ball');
            ball_span.classList.add('lucky-ball');
            lucky_balls_span.appendChild(ball_span)
    })
     
     //  player ball span
     player_balls_array.forEach((ball)=>{
        let ball_span = document.createElement('span');
        ball_span.innerHTML = ball;
         if(lucky_balls_array.includes(ball)){
            ball_span.classList.add('ball');
            ball_span.classList.add('lucky-ball');
            counter++;
            i_won = true;
         }else{
            ball_span.classList.add('ball');
        
         }
        player_balls_span.appendChild(ball_span)

})

      // winning logic
      let total_winnings = counter  * Number(bet_amount.value);
      document.querySelector('.winnings').innerHTML ='$'+total_winnings

    //   Update the profile board balance with winnings
    profile_board_balance.textContent = Number(profile_board_balance.textContent) + total_winnings
    if(i_won){
        alert("winnings has been added to your balance. Enjoy!")
    
    }
 
})








