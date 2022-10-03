const cardWrapper = document.querySelector('.images')
const loadMore = document.querySelector('.load-more')
let dataPosts
let showPost = 12

const cardObserver = new IntersectionObserver(entries=> {
  entries.forEach(item=> {
    if(item.isIntersecting) {
      setTimeout(()=> {
        showData(12, dataPosts, loadMore)
      }, 1000)
    }
  })
})

fetch('post.json')
  .then(resp=> resp.json())
  .then(posts=> {
  dataPosts = posts
  let template = ''
  posts.slice(0, showPost).forEach(post=> {
    template += `
                      <div class="image-box">${post.image}
                      <h3 class="card-title">${post.title}</h3>
                      </div>
                  `
  })

  cardWrapper.insertAdjacentHTML('beforeend', template)

  cardObserver.observe(loadMore)
})

function showData(total, posts, loadMoreEL) {
  const totalPost = showPost

  showPost += total

  if(showPost > posts.length) {
    showPost = posts.length
    loadMoreEL.style.display = 'none'
  }

  let template = ''
  posts.slice(totalPost, showPost).forEach(post=> {
    template += `
                      <div class="image-box">${post.image}
                      <h3 class="card-title">${post.title}</h3>
                      </div>
                  `
  })

  cardWrapper.insertAdjacentHTML('beforeend', template)
}