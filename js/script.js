'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function(event) {

  event.preventDefault(); //blokuje zmienianie się adresu po klikaniu w poszczególne linki
  const clickedElement = this; //deklaracja stałej, która zwraca informację nt. klikniętego elementu (dzięki zastosowaniu 'this')
  console.log('Link was clicked!'); //wyświetlenie komunikatu w console.log po kliknięciu w link


  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active'); //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne linki wewnątrz div'a z klasą .titles)
  for (let activeLink of activeLinks) { //wywołanie funkcji, która usuwa wszystkie aktywne linki poprzez usunięcie klasy 'active' (z listy zwróconej przez 'const activeLinks')
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  // console.log('clickedElement (with plus): ' + clickedElement);         //wyświetla adres strony + klasę/href klikniętego linka
  clickedElement.classList.add('active') //wywołanie funkcji, która dodaje aktywny link porzez dodanie klasy 'active' do klikniętego elementu (dzięki zastosowaniu obiekutu 'this')
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active'); //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne artykuły wewnątrz div'a z klasą .post)
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href"); //deklaracja stałej, która ma zwracać wartość atrybutu #href dla klikniętego linka
  //alert(articleSelector); wyświetla komunikat o treści 'elementAttribute'
  console.log('#href of clicked element is:', articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleTarget = articleSelector.replace('#', ''); //deklaracja stałej, która zamienia ciąg znaków na inny zadeklarowany ciąg znaków (usunięcie '#' przed article)

  /* [DONE] add class 'active' to the correct article */
  document.getElementById(articleTarget).classList.add('active'); //wywołanie funkcji, która ustawi class='active' dla klikniętego elementu
}

const links = document.querySelectorAll('.titles a');
console.log('links:', links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const articleSelector = 'post',
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optSectionSelector = '.posts';

function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector); //deklaracja stałej, która wybiera 'ul' z klasą 'titles'
  titleList.innerHTML = ""; //wywołanie funkcji, która usuwa listę z taga 'ul' z klasą 'titles'

  /* [IN PROGRESS] for each article */
  const articles = document.querySelectorAll(optArticleSelector); //deklaracja stałej, która wybiera wszystkie selectory spełniające warunek 'optArticleSelector'
  for (let article of articles) { //wywołanie pętli, która zwraca informacje dla pojedyńczych artykułów z listy artykułów zwróconej przez 'articles'
    //console.log('szczegóły artykułu: ', article);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('Tytuł artykułu: ', articleTitle);

    /* get the article id */
    const articleId = article.getAttribute("id");
    console.log('Article ID to: ', articleId);
  }



  /* get the title from the title element */

  /* create HTML of the link */

  /* insert link into titleList */

}

generateTitleLinks();
//console.log ("wykonanie generateTitleLinks:", generateTitleLinks);