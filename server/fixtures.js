if (Stations.find().count() === 0) {
  Stations.insert({
    name: 'Station 1',
    address: '123 Fake St.',
    image_url: 'lot.jpg'
  });

  Stations.insert({
    name: 'Station 2',
    address: '123 Fake St.',
    image_url: 'lot.jpg'
  });

  Stations.insert({
    name: 'Station 3',
    address: '123 Fake St.',
    image_url: 'lot.jpg'
  });
}