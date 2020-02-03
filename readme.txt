Plan: 
- create barebones "join game" screen 
    - okay this is a bit more complicated than I thought. We'll need jQuery and ajax to get proper callback so we can only proceed once we verify the POST was successful
    - need to add security checks on input 
    - read MDN article on Express with forms: it talks about express-validator library
- if no one is online, allow player to input seed to create world 
- make world scroll if you go out of range 
- create shadow trail for time travel aspect


Log-in flow: 
- go to website, then type in name and press Join Game. 
- if no one else is in game, prompt for seed. 
- generate world using seed, then check if no other world is generated 
- if no other world is generated, make this world the default and load player
