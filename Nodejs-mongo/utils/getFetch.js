const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

  const getFetch = async(callingCode) => {
    const res = await fetch(`https://restcountries.com/v2/callingcode/${callingCode}`)
    const data = await res.json()
    return data;
}

module.exports = getFetch