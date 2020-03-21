'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function (event) {

  event.preventDefault();                                                   //blokuje zmienianie się adresu po klikaniu w poszczególne linki
  const clickedElement = this;                                              //deklaracja stałej, która zwraca informację nt. klikniętego elementu (dzięki zastosowaniu 'this')
  console.log('Link was clicked!');                                         //wyświetlenie komunikatu w console.log po kliknięciu w link


  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');        //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne linki wewnątrz div'a z klasą .titles)
  for (let activeLink of activeLinks) {                                     //wywołanie funkcji, która usuwa wszystkie aktywne linki poprzez usunięcie klasy 'active' (z listy zwróconej przez 'const activeLinks')
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  // console.log('clickedElement (with plus): ' + clickedElement);         //wyświetla adres strony + klasę/href klikniętego linka
  clickedElement.classList.add('active');                                  //wywołanie funkcji, która dodaje aktywny link porzez dodanie klasy 'active' do klikniętego elementu (dzięki zastosowaniu obiekutu 'this')
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');        //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne artykuły wewnątrz div'a z klasą .post)
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');             //deklaracja stałej, która ma zwracać wartość atrybutu #href dla klikniętego linka
  console.log('#href of clicked element is:', articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleTarget = articleSelector.replace('#', '');                  //deklaracja stałej, która zamienia ciąg znaków na inny zadeklarowany ciąg znaków (usunięcie '#' przed article)

  /* [DONE] add class 'active' to the correct article */
  document.getElementById(articleTarget).classList.add('active');          //wywołanie funkcji, która ustawi class='active' dla klikniętego elementu
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);           //deklaracja stałej, która zwraca 'ul' z klasą 'titles'
  titleList.innerHTML = '';                                                 //wywołanie funkcji, która usuwa listę z taga 'ul' z klasą 'titles'

  let html = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);           //deklaracja stałej, która zwraca wszystkie selectory spełniające warunek 'optArticleSelector'
  for (let article of articles) {                                           //wywołanie pętli, która zwraca informacje dla pojedyńczych artykułów z listy artykułów zwróconej przez 'articles'
    //console.log('szczegóły artykułu: ', article);

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; //deklaracja stałej, która zwraca wszystkie tytuły (string/innerHTML z tagów o klasie .'post-title')
    console.log('Tytuł artykułu: ', articleTitle);

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');                           //deklaracja stałej, która zwraca wszystkie ID dla wszystkich tagów article (na podstawie 'cosnt articles')
    console.log('Article ID to: ', articleId);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li class="btn"><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';     //deklaracja stałej, która zwraca ciąg znaków  
    //console.log (linkHTML);

    /* [DONE] insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;                 //deklaracja stałej, która 'wrzuca' ciąg znaków z powyższej stałej do 'innerHTML' stałej titleList
    //console.log (titleList.innerHTML);

    //function insertHTML() {
    //const putHTML = document.querySelector(optTitleListSelector);         //deklaracja stałej, która zwraca 'ul' z klasą 'titles'
    //putHTML.insertAdjacentHTML("beforeend", linkHTML);                    //funkcja, która dodajekod HTML do wybranego elementu
    //console.log (putHTML);
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;

  //insertHTML();
  //}

  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
//console.log ("wykonanie generateTitleLinks:", generateTitleLinks);