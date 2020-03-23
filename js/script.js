'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function (event) {

  event.preventDefault();                                                   //blokuje zmienianie się adresu po klikaniu w poszczególne linki
  const clickedElement = this;                                              //deklaracja stałej, która zwraca informację nt. klikniętego elementu (dzięki zastosowaniu 'this')
  //console.log('Link was clicked!');                                         //wyświetlenie komunikatu w console.log po kliknięciu w link


  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');        //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne linki wewnątrz div'a z klasą .titles)
  for (let activeLink of activeLinks) {                                     //wywołanie funkcji, która usuwa wszystkie aktywne linki poprzez usunięcie klasy 'active' (z listy zwróconej przez 'const activeLinks')
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  // console.log('clickedElement (with plus): ' + clickedElement);         //wyświetla adres strony + klasę/href klikniętego linka
  clickedElement.classList.add('active');                                  //wywołanie funkcji, która dodaje aktywny link porzez dodanie klasy 'active' do klikniętego elementu (dzięki zastosowaniu obiekutu 'this')
  //console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');        //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne artykuły wewnątrz div'a z klasą .post)
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');             //deklaracja stałej, która ma zwracać wartość atrybutu #href dla klikniętego linka
  //console.log('#href of clicked element is:', articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleTarget = articleSelector.replace('#', '');                  //deklaracja stałej, która zamienia ciąg znaków na inny zadeklarowany ciąg znaków (usunięcie '#' przed article)

  /* [DONE] add class 'active' to the correct article */
  document.getElementById(articleTarget).classList.add('active');          //wywołanie funkcji, która ustawi class='active' dla klikniętego elementu
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

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
    //console.log('Tytuł artykułu: ', articleTitle);

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');                           //deklaracja stałej, która zwraca wszystkie ID dla wszystkich tagów article (na podstawie 'cosnt articles')
    //console.log('Article ID to: ', articleId);

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

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();                                                       //wykonanie generateTitleLinks:", generateTitleLinks);

function generateTags () {
  
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector); 
  
  /* START LOOP: for every article: */
  for (let article of articles) { 
    
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);       //deklaracja stałej, która zwraca 'ul' z klasą ''
    let htmlTag = '';

    /* make html variable with empty string */
    

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
 
      /* generate HTML of the link */
      const linkHTMLtag = '<li><a href="#tag-' + tag + '">' + tag + '   ' + '</a></li>';
     
      /* add generated code to html variable */
      htmlTag = htmlTag + linkHTMLtag;
      
    /* END LOOP: for each tag */
    }
    tagList.innerHTML = htmlTag;
    
    /* insert HTML of all the links into the tags wrapper */
    const linksTag = document.querySelectorAll('.list a');
    
    /* END LOOP: for every article: */
  }
}

generateTags();
const tagClickHandler = function (event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;  
  console.log(clickedElement); 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href)');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.getAttribute('data-tags');
 

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('.post.active');
  console.log('tagi dla klikniętego elementu to: ', );

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();

