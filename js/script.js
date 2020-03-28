'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function (event) {

  event.preventDefault();                                                   //blokuje zmienianie się adresu po klikaniu w poszczególne linki
  const clickedElement = this;                                              //deklaracja stałej, która zwraca informację nt. klikniętego elementu (dzięki zastosowaniu 'this')
  //console.log('This dla clickedElement to: ', clickedElement);                                         //wyświetlenie komunikatu w console.log po kliknięciu w link


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
  //console.log('#href of clickedElement is:', articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleTarget = articleSelector.replace('#', '');                  //deklaracja stałej, która zamienia ciąg znaków na inny zadeklarowany ciąg znaków (usunięcie '#' przed article)

  /* [DONE] add class 'active' to the correct article */
  document.getElementById(articleTarget).classList.add('active');          //wywołanie funkcji, która ustawi class='active' dla klikniętego elementu
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);           //deklaracja stałej, która zwraca 'ul' z klasą 'titles'
  titleList.innerHTML = '';                                                 //wywołanie funkcji, która usuwa listę z taga 'ul' z klasą 'titles'
  
  let html = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);           //deklaracja stałej, która zwraca wszystkie selectory spełniające warunek 'optArticleSelector'

  for (let article of articles) {                                           //wywołanie pętli, która zwraca informacje dla pojedyńczych artykułów z listy artykułów zwróconej przez 'articles'

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
    

    //function insertHTML() {
    //const putHTML = document.querySelector(optTitleListSelector);         //deklaracja stałej, która zwraca 'ul' z klasą 'titles'
    //putHTML.insertAdjacentHTML("beforeend", linkHTML);                    //funkcja, która dodajekod HTML do wybranego elementu
    //console.log (putHTML);
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;
  //console.log (titleListHTML);

  //insertHTML();
  //}

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();                                                       //wykonanie generateTitleLinks:", generateTitleLinks);

function generateTags () {
  
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector); 
  
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) { 
    
    /* [DONE] find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);       //deklaracja stałej, która zwraca 'ul' z klasą ''
    

    /* [DONE] make html variable with empty string */
    let htmlTag = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
 
      /* [DONE] generate HTML of the link */
      const linkHTMLtag = '<li><a href="#tag-' + tag + '">' + tag + '   ' + '</a></li>';
     
      /* [DONE] add generated code to html variable */
      htmlTag = htmlTag + linkHTMLtag;
      
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = htmlTag;  
    //const linksTag = document.querySelectorAll('.list a');
    
    /* [DONE] END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement2 = this; 
  //console.log('clicked element to: ', clickedElement2);   

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement2.getAttribute('href');
  console.log('href dla klikniętego elementu to: ', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('data-tags dla klikniętego elementu to: ', tag);

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  
  //const allArticlesOfTag = document.querySelectorAll('a[href="' + href + '"]');
    
  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
  
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');
  
  /* [DONE] END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('.list-horizontal a');

  /* START LOOP: for each link */
  for (let tag of tags) {

    /* add tagClickHandler as event listener for that link */
  tag.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors () {
  
  /* [DONE] find all articles  */
  const articles = document.querySelectorAll(optArticleSelector);
  
  
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) { 
    
    /* [DONE] find authors wrapper */
    let authorName = article.querySelector(optArticleAuthorSelector);
    //console.log('authorName to: ',authorName);

    /* [DONE] make html variable with empty string */
    let htmlAuthor = authorName.innerHTML;
    //console.log('htmlAuthor to: ',htmlAuthor);

    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log('articleAuthor to: ',articleAuthor);
  
    /* [DONE] generate HTML of the link */
    const linkHTMLauthor = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '   ' + '</a>';
    //console.log('linkHTMLauthor to: ',linkHTMLauthor);

    /* [DONE] add generated code to html variable */
    htmlAuthor = htmlAuthor + linkHTMLauthor;
    //console.log('htmlAuthor to: ',htmlAuthor);

    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorName.innerHTML = htmlAuthor;  
    //console.log('authorName.innerhtml to: ',authorName.innerHTML);
    
    }
  }
  
  generateAuthors();
  
  function authorClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement3 = this;
    
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href2 = clickedElement3.getAttribute('href');
    console.log('href2 to: ',href2);

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href2.replace('#author-', '');

    /* [DONE] find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* [DONE] remove class active */
      activeAuthorLink.classList.remove('active');
    }

    /* find all tag links with "href" attribute equal to the "href2" constant */
    const authorLinks = document.querySelectorAll(href2);

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');
      
    /* END LOOP: for each found author link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

  }
  
  function addClickListenersToAuthors(){
    /* find all links to authors */
   const authors = document.querySelectorAll('.post-author a');
  
    /* START LOOP: for each link */
    for (let author of authors) {
  
      /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();
  
  


