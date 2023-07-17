import fs from "fs"

// Lee el archivo de texto
fs.readFile('./tagWords.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Divide los tags utilizando comas y saltos de línea como separadores
  const tags = data.split(/,|\n/);

  // Elimina los espacios en blanco al inicio y final de cada tag
  const trimmedTags = tags.map(tag => tag.trim());

  // Filtra los tags únicos
  const uniqueTags = [...new Set(trimmedTags)];

  console.log(uniqueTags);
  fs.appendFileSync("./tagWords.txt", String(uniqueTags))
});


const tags = [
  'Birds', 'Coins', 'Men', 'Profiles', 'Eagles', 'Abraham Lincoln', 'Portraits', 'Boats', 'Landscapes',
  'Animals', 'Garlands', 'Cannons', 'Swords', 'Admirals', 'Advertisements', 'Human Figures', 'Apples',
  'Feet', 'Heads', 'Dancers', 'Women', 'Hieroglyphs', 'Hunting', 'Factories', 'Leaves', 'Lions', 'Flowers',
  'Sphinx', 'Grapes', 'Windows', 'Waterfalls', 'Autumn', 'Plants', 'Infants', 'Cats', 'Cradles', 'Balconies',
  'Houses', 'Chariots', 'Horses', 'Baptism of Christ', 'Angels', 'Christ', 'Ships', 'Doors', 'Coat of Arms',
  'Bears', 'Benjamin Franklin', 'Books', 'Masks', 'Faces', 'Children', 'Eyes', 'Fountains', 'Mythical Creatures',
  'Parrots', 'Bobbins', 'Reading', 'Boots', 'Musicians', 'Fish', 'Dogs', 'George Washington', 'Maps', 'Boys',
  'Fruit', 'Farmers', 'Tulips', 'Butterflies', 'Cows', 'Marquis de Lafayette', 'Lambs', 'Sleeping',
  'Transatlantic Cable', 'Insects', 'Deer', 'Doves', 'Unicorns', 'Peacocks', 'Mountains', 'Trees',
  'Musical Instruments', 'Satyrs', 'Zodiac', 'Strawberries', 'Dolphins', 'Elephants', 'Girls', 'Globes',
  'Caryatids', 'Lotuses', 'Capitals', 'Buildings', 'Rosaries', 'Arms', 'Harps', 'Hands', 'Ornament',
  'Griffins', 'Squirrels', 'Dancing', 'Cornucopia', 'Toys', 'Dragonflies', 'Jesus', 'Churches', 'Seals',
  'Obelisks', 'Flags', 'Swans', 'Acorns', 'Ducks', 'Chickens', 'Roosters', 'Turkeys', 'Owls', 'Rabbits',
  'Pigs', 'Sheep', 'Calligraphy', 'New York City', 'Tools', 'Sun', 'Emblems', 'Mice', 'Roses', 'Corn',
  'Cross', 'Crucifixion', 'Soldiers', 'Tea Drinking', 'Arrows', 'Lyres', 'Museums', 'Drums', 'Playing',
  'Bridges', 'Correspondence', 'Fire', 'Generals', 'Snakes', 'Slaves', 'Female Nudes', 'Camels',
  'Baptismal Fonts', 'Bow and Arrow', 'Mothers', 'Working', 'Putti', 'Dragons', 'Rats', 'Moses',
  'Carts', 'Drinking', 'Gardens', 'Shipwrecks', 'Battles', 'Lakes', 'Military', 'Thomas Jefferson',
  'Kings', 'Funerary Monuments', 'Sadness', 'Chapels', 'Still Life', 'Male Nudes', 'Cupid', 'Venus',
  'Bats', 'Scissors', 'Mermaids', 'Stars', 'Queens', 'Louis XVI', 'Serpents', 'Fireplaces', 'Geese',
  'Goats', 'Shells', 'Vines', 'Peonies', 'Bees', 'Calendars', 'Psyche', 'Boars', 'Firearms',
  'Playing Cards', 'Water Lilies', 'Castles', 'Queen Victoria', 'Crowns', 'Carriages', 'Monuments',
  'Games', 'Fortification', 'Pavilions', 'Theatre', 'Rivers', 'Trains', 'Bells', 'Rams', 'Cities',
  'Canals', 'Acanthus', 'Money', 'Interiors', 'Frogs', 'Mushrooms', 'Turtles', 'Donkeys', 'Hills',
  'Diana', 'Streams', 'Night', 'Street Scene', 'Spring', 'Streets', 'Markets', 'Farms', 'Fans',
  'Self-portraits', 'Evening', 'Paris', 'Crowd', 'Bulls', 'Waves', 'Seascapes', 'Contemplation',
  'Music', 'Flutes', 'Couples', 'Pianos', 'Don Quixote', 'Venice', 'Watermills', 'Towers', 'Towns',
  'Ruins', 'Villages', 'Wells', 'Ariadne', 'Seas', 'Eurydice', 'Suffering', 'Artists', 'Roads',
  'Docks', 'Tunnels', 'Railways', 'Parks', 'Sculpture', 'Umbrellas', 'Sailors', 'Baskets', 'Forests',
  'Needlework', 'Knitting', 'Smoking', 'Dice', 'Gambling', 'Writing', 'Sewing', 'Violins', "Trompe-l'Oeil",
  'Funerals', 'Swimming', 'Ladders', 'Firefighters', 'Genre Scene', 'Washing', 'Processions', 'Kitchens',
  'Actors', 'Rainbows', 'Pitchers', 'Family', 'Slavery', 'Storms', 'Jaguars', 'Army', 'Moon', 'Beaches',
  'Lutes', 'Horns', 'Aqueducts', 'Oceans', 'Barns', 'Newspapers', 'Incense Burners', 'Chairs', 'Shepherds',
  'Fishing', 'Ponds', 'Summer', 'Onions', 'Schools', 'Winter', 'Snow', 'Wagons', 'Death', 'Chess',
  'Singing', 'Students', 'Medicine', 'Doctors', 'Spinning Wheel', 'Rowing', 'Authors', 'Tables', 'Hammers',
  'Helmets', 'Vegetables', 'Jugs', 'Muses', 'Sky', 'Walking', 'Foxes', 'Textiles', 'Shakespeare',
  'Painting', 'Bacchantes', 'Buddha', 'Allegory', 'Socrates', 'Saints', 'American Revolution', 'Altars',
  'Victory', 'Running', 'Athletes', 'Happiness', 'Fauns', 'Shoes', 'Feathers', 'Illness', 'Temples',
  'Saint Catherine', 'Descent from the Cross', 'Entombment', 'Virgin Mary', 'Madonna and Child', 'Tombs',
  'Armor', 'Adoration of the Shepherds', 'Annunciation', 'Palms', 'Architecture', 'Palaces', 'Sundials',
  'Bathing', 'Pomegranates', 'Lilies', 'Athena', 'Guitars', 'Saint Matthew', 'Wine', 'Cakes', 'Jewelry',
  'Dolls', 'Ice', 'London', 'Cars', 'Dance', 'Courtyards', 'Abstraction', 'Rain', 'Buffalos', 'Gates',
  'Trumpets', 'Pineapples', 'Bananas', 'Pastoral', 'Coffins', 'Bedrooms', 'Servants', 'King Lear', 'Chemistry',
  'Sports', 'Cherries', 'Cooking', 'Eating', 'Picnics', 'Morning', 'Tents', 'Dawn', 'Warehouses', 'Shops'
];

