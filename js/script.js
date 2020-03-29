'use strict';

const titleClickHandler = function (event) {

  event.preventDefault();                                                   //blokuje zmienianie się adresu po klikaniu w poszczególne linki
  const clickedElement = this;                                              //deklaracja stałej, która zwraca informację nt. klikniętego elementu (dzięki zastosowaniu 'this')
  
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');        //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne linki wewnątrz div'a z klasą .titles)
  for (let activeLink of activeLinks) {                                     //wywołanie funkcji, która usuwa wszystkie aktywne linki poprzez usunięcie klasy 'active' (z listy zwróconej przez 'const activeLinks')
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');                                  //wywołanie funkcji, która dodaje aktywny link porzez dodanie klasy 'active' do klikniętego elementu (dzięki zastosowaniu obiekutu 'this')
  
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');        //deklaracja stałej, która ma zwracać wszystkie określone selektory (w tym wypadku wszystkie aktywne artykuły wewnątrz div'a z klasą .post)
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');             //deklaracja stałej, która ma zwracać wartość atrybutu #href dla klikniętego linka
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const articleTarget = articleSelector.replace('#', '');                  //deklaracja stałej, która zamienia ciąg znaków na inny zadeklarowany ciąg znaków (usunięcie '#' przed article)

  /* [DONE] add class 'active' to the correct article */
  document.getElementById(articleTarget).classList.add('active');          //wywołanie funkcji, która ustawi class='active' dla klikniętego elementu
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 4,
  optCloudClassPrefix = 'tag-size-';

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
    
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');                           //deklaracja stałej, która zwraca wszystkie ID dla wszystkich tagów article (na podstawie 'cosnt articles')
    
    /* [DONE] create HTML of the link */
    const linkHTML = '<li class="btn"><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';     //deklaracja stałej, która zwraca ciąg znaków  
    
    /* [DONE] insert link into titleList */
    
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();                                                       //wykonanie generateTitleLinks:", generateTitleLinks);


function calculateTagsParams(tags) {

  const params = { max: 0, min: 999999 };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    };
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass (count, params) {

  const classNumber = Math.floor(((count - params.min)/(params.max - params.min)) * optCloudClassCount + 1); 

  return classNumber;
}




function generateTags() {


  

  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};

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
    for (let tag of articleTagsArray) {

      /* [DONE] generate HTML of the link */
      const linkHTMLtag = '<li><a href="#tag-' + tag + '">' + tag + '   ' + '</a></li>';
      
      /* [DONE] add generated code to html variable */
      htmlTag = linkHTMLtag;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = htmlTag;

    /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {

    const linkHTMLtagsArray = '<li><a ' +'class="'  + optCloudClassPrefix +  calculateTagClass(allTags[tag], tagsParams) + '" ' + 'href="#tag-' + tag + '">' + tag + '   ' + '</a></li>';
    

    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += linkHTMLtagsArray + ' (' + allTags[tag] + ') ';
  }

  /* [DONE] END LOOP: for each tag in allTags: */

  /*[DONE] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement2 = this;   

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement2.getAttribute('href');
  console.log('href dla klikniętego elementu to: ', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('data-tags dla klikniętego elementu to: ', tag);

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);

  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* [DONE] add class active */
    tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
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

function generateAuthors() {

  /* [DONE] find all articles  */
  const articles = document.querySelectorAll(optArticleSelector);


  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find authors wrapper */
    let authorName = article.querySelector(optArticleAuthorSelector);
    // console.log('authorName to: ',authorName);

    /* [DONE] make html variable with empty string */
    let htmlAuthor = authorName.innerHTML;

    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */
    const linkHTMLauthor = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '   ' + '</a>';

    /* [DONE] add generated code to html variable */
    htmlAuthor = linkHTMLauthor;

    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorName.innerHTML = htmlAuthor;
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
  //console.log('href2 to: ', href2);

  /* [DONE] make a new constant "author" and extract tag from the "href" constant */
  const author = href2.replace('#author-', '');

  /* [DONE] find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {

    /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href2" constant */
  const authorLinks = document.querySelectorAll(href2);

  /* [DONE] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {

    /* [DONE] add class active */
    authorLink.classList.add('active');

    /* [DONE] END LOOP: for each found author link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const authors = document.querySelectorAll('.post-author a');

  /* [DONE] START LOOP: for each link */
  for (let author of authors) {

    /* [DONE] add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();




