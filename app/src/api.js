const HOST_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://justfoodapi.com';

class Api {
  getBusinesses = searchParams => {
    const METERS_PER_MILE = 1609.34;
    const radius = searchParams.radius * METERS_PER_MILE;
    if (!searchParams.keyword) {
      searchParams.keyword = 'restaurants';
    }
    return fetch(
      `${HOST_URL}/restaurants/?long=${searchParams.longitude}&lat=${searchParams.latitude}&keyword=${searchParams.keyword}&radius=${radius}&open=${searchParams.openNow}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      },
    ).then(res => res.json());
  };

  getBusiness = businessId => {
    return fetch(`${HOST_URL}/restaurants/place/?businessId=${businessId}`, {
      method: 'get',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  getCoordinates = address => {
    return fetch(`${HOST_URL}/restaurants/geocode/?address=${address}`, {
      method: 'get',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  getYelpLink = attributes => {
    return fetch(
      `${HOST_URL}/places/yelp/?name=${attributes.name}&address1=${attributes.address1}&city=${attributes.city}&state=${attributes.state}&zip_code=${attributes.zip}&phone=${attributes.phone}&lat=${attributes.lat}&lng=${attributes.lng}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      },
    ).then(res => res.json());
  };
}

export default new Api();
