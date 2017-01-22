var navbarItems = document.getElementsByClassName('navbar-item');

for (var i = 0; i < navbarItems.length; i++) {
    navbarItems[i].addEventListener('click', function(event){
        deleteActiveClass();
        this.classList.add('active');

        var sectionToGo = this.getElementsByTagName('a')[0].href.split('#');
        if (sectionToGo.length > 1) {
            event.preventDefault();
            var goTo = sectionToGo[sectionToGo.length - 1];
            getElementByIdAndScroll(goTo);
        }
    });
}

function getElementByIdAndScroll(name) {
    var element;
    if (name == '') {
        element = document.getElementsByClassName('header')[0];
    } else {
        element = document.getElementById(name);
    }

    scrollToElement(element);
}

function scrollToElement(element) {
    var jump = parseInt(element.getBoundingClientRect().top * 0.3);
    document.body.scrollTop += jump;

    if(!element.lastJump || element.lastJump > Math.abs(jump)) {
        element.lastJump = Math.abs(jump);

        setTimeout(function() {
            scrollToElement(element);
        }, "60");
    } else {
        element.lastJump = null;
    }
}

function deleteActiveClass() {
    document.getElementsByClassName('navbar-item active')[0].classList.remove('active');
}

var cumulativeOffset = function(element) {
    var top = 0;
    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while(element);

    return top;
};

var offsetWho = cumulativeOffset(document.getElementById('who')) - 59;
var offsetStudy = cumulativeOffset(document.getElementById('study')) - 59;
var offsetContact = cumulativeOffset(document.getElementById('contact')) - 59;
var offsetHobbies = cumulativeOffset(document.getElementById('hobbies')) - 59;
var offsetExperience = cumulativeOffset(document.getElementById('experience')) - 59;

window.addEventListener('scroll', changeMenuStyle);

function changeMenuStyle(event) {
    var previous;

    if (window.pageYOffset >= 0 && window.pageYOffset < offsetWho) {
        if(!previous) {
            previous = 1;
        } else if(previous == 1) {
            return false;
        }

        deleteActiveClass();
        document.querySelector('a[href="#"]').parentNode.classList.add("active");
    }else if(window.pageYOffset >= offsetWho && window.pageYOffset < offsetStudy) {
        if(!previous) {
            previous = 2;
        } else if(previous == 2) {
            return false;
        }

        deleteActiveClass();
        document.querySelector('a[href$="who"]').parentNode.classList.add("active");
    }else if(window.pageYOffset >= offsetStudy && window.pageYOffset < offsetExperience) {
        if(!previous) {
            previous = 3;
        } else if(previous == 3) {
            return false;
        }

        deleteActiveClass();
        document.querySelector('a[href$="study"]').parentNode.classList.add("active");
    } else if (window.pageYOffset >= offsetExperience && window.pageYOffset < offsetHobbies) {
        if(!previous) {
            previous = 4;
        } else if(previous == 4) {
            return false;
        }

        deleteActiveClass();
        document.querySelector('a[href$="experience"]').parentNode.classList.add("active");
    } else if (window.pageYOffset >= offsetHobbies && window.pageYOffset < offsetContact) {
        if(!previous) {
            previous = 5;
        } else if(previous == 5) {
            return false;
        }

        deleteActiveClass();
        document.querySelector('a[href$="hobbies"]').parentNode.classList.add("active");
    }else if (window.pageYOffset >= offsetContact) {
        if(!previous) {
            previous = 6;
        } else if(previous == 6) {
            return false;
        }

        deleteActiveClass();
        document.querySelector('a[href$="contact"]').parentNode.classList.add("active");
    }
}
