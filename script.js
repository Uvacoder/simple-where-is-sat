const mymap = L.map('map', {
      center: [0,0],
      zoom: 3,
      gestureHandling: true,
      
    })
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { 
      attribution,
      scrollWheelZoom: false 
    });
    tiles.addTo(mymap);

    const issIcon = L.icon({
      iconUrl: '/media/iss.svg',
      iconSize: [100, 100],
      iconAnchor: [50, 50]
    });
    const marker = L.marker([0, 0], { 
      icon: issIcon
      }).addTo(mymap);
    
    marker.bindTooltip("<b>International Space Station</b>");

    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles';

    let firstTime = true;

    async function getData() {
      const res = await fetch(api_url);
      const data = await res.json();
      const { timestamp, altitude, velocity, latitude, longitude, visibility } = data;

      marker.setLatLng([latitude, longitude]);
      if (firstTime) {
        mymap.setView([latitude, longitude], 3);
        firstTime = false;
      }
      const date = new Date();
      //console.log(new Date(timestamp).toLocaleString())
      document.getElementById('time').textContent = date.toTimeString();
      document.getElementById('alt').textContent = altitude.toFixed(2);
      document.getElementById('vel').textContent = velocity.toFixed(2);
      document.getElementById('lat').textContent = latitude.toFixed(2);
      document.getElementById('lon').textContent = longitude.toFixed(2);
      
      if(visibility == 'daylight'){
        document.getElementById('vis').textContent = 'The ISS is in daylight'
        document.getElementById('visibility').classList.add("daylight")
      } else if(visibility == 'eclipsed'){
        document.getElementById('vis').textContent = "The ISS is under Earth's shadow"
        document.getElementById('visibility').classList.add("eclipsed")
      }

    }

    getData();

    setInterval(getData, 1500);