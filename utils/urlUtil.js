

export async function getUrl(searchWord, key) {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchWord}&client_id=${key}`);
      const data = await response.json();
      const imageUrl = []
      for (let i = 0; i < 10; i++) {
        if (data.results[i]) {
         
          imageUrl.push({ urlFull: data.results[i].urls.full, urlThumb: data.results[i].urls.thumb, name: data.results[i].user.last_name ? data.results[i].user.first_name + ' ' + data.results[i].user.last_name : data.results[i].user.first_name, portfolioUrl: data.results[i].user.links.html })

        }
      }
      return (imageUrl)
    }
    catch {
      return ([])
    }
  }