  angular.module('profile.services', [])
  .factory('Skills', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var skills = [{
        id: 0,
        name: 'Web Design',
        endorsements: 5,
        people: ['Ionic', 'Ben', 'Max', 'Mike', 'Perry']
    }, {
            id: 1,
            name: 'Lifting',
            endorsements: 3,
            people: ['Ionic', 'Ben', 'Max']
        }, {
            id: 2,
            name: 'Database Management',
            endorsements: 4,
            people: ['Ionic', 'Ben', 'Max', 'Mike']
        }, {
            id: 3,
            name: 'Entertaining',
            endorsements: 2,
            people: ['Ionic', 'Ben']
        }, {
            id: 4,
            name: 'Studying',
            endorsements: 1,
            people: ['Ionic']
        }];

    return {
        all: function () {
            return skills;
        },
        remove: function (skill) {
            skills.splice(chats.indexOf(skill), 1);
        },
        get: function (skillId) {
            for (var i = 0; i < skills.length; i++) {
                if (skills[i].id === parseInt(skillId)) {
                    return skills[i];
                }
            }
            return null;
        }
    };
})

    .factory('Reviews', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var reviews = [{
            id: 0,
            name: 'Adam',
            rating: 4,
            title: 'Good Job!',
            text: 'Lorem ipsum dolor sit amet, ne qui putent iriure, doctus urbanitas vim et, vim dicam vivendo deseruisse ea. An postea minimum contentiones eam, utinam alienum vix ei, vis denique appareat cu. Eirmod utroque philosophia ea vis. Sale reprimique reformidans has ad, no debet tation impedit ius, et vim debet error. Stet case menandri qui an, vix viderer elaboraret at. Altera laboramus ex vim, malis graeco omittantur vel ad.'
        }, {
                id: 1,
                name: 'Lifting',
                rating: 3,
                title: 'Good Job!!',
                text: 'Cu ludus mucius explicari eam, augue everti cum cu. Inani partem audire at mei. Ei partiendo pertinacia pro, vero meis mediocritatem at duo. Verear oportere elaboraret vim an, delenit alienum probatus ex pro, ea mandamus periculis splendide pri.'
            }, {
                id: 2,
                name: 'Database Management',
                rating: 4,
                title: 'Good Job!!!',
                text: 'Cu natum justo quo, cum scripta nominati ei, his no assentior voluptatum. Ne erant intellegat vel, paulo tollit in usu. In deleniti adversarium pro, et mei labitur nusquam oporteat. Meliore incorrupte vel cu, tation incorrupte an nec. Dicat efficiantur conclusionemque id eos. Habeo inermis tractatos eam id, ea ferri decore doctus quo.'
            }, {
                id: 3,
                name: 'Entertaining',
                rating: 2,
                title: 'Good Jo!',
                text: 'Vel nemore perpetua ex, eligendi splendide instructior ei pro, aliquip pericula dignissim nec ea. Vix ad simul mollis, est maiorum theophrastus ei. Ex accumsan voluptua definitiones quo, congue everti at per. Pri no modus possim necessitatibus, sea at malis habemus, dicat erant electram eum no'
            }, {
                id: 4,
                name: 'Studying',
                rating: 1,
                title: 'Good Jb!',
                text: 'Vim in homero mandamus, amet ocurreret sea eu. Intellegat inciderint ei vis, vix at dicat constituto. At per facete laboramus delicatissimi. Id consulatu intellegebat eos, mea omnium cetero cu. Efficiendi efficiantur conclusionemque ei quo, at dico tempor detracto sit. Ne utamur civibus laboramus eum, agam brute justo ad mea.'
            }];

        return {
            all: function () {
                return reviews;
            },
            remove: function (review) {
                reviews.splice(reviews.indexOf(review), 1);
            },
            get: function (reviewId) {
                for (var i = 0; i < reviews.length; i++) {
                    if (reviews[i].id === parseInt(reviewId)) {
                        return reviews[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('Portfolio', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var portfolio = [{
            id: 0,
            title: 'Papa Murphy rush order tool',
            text: 'Lorem ipsum dolor sit amet, ne qui putent iriure, doctus urbanitas vim et, vim dicam vivendo deseruisse ea. An postea minimum contentiones eam, utinam alienum vix ei, vis denique appareat cu. Eirmod utroque philosophia ea vis. Sale reprimique reformidans has ad, no debet tation impedit ius, et vim debet error. Stet case menandri qui an, vix viderer elaboraret at. Altera laboramus ex vim, malis graeco omittantur vel ad.'
        }, {
                id: 1,
                title: 'Chef Cookbook',
                text: 'Cu ludus mucius explicari eam, augue everti cum cu. Inani partem audire at mei. Ei partiendo pertinacia pro, vero meis mediocritatem at duo. Verear oportere elaboraret vim an, delenit alienum probatus ex pro, ea mandamus periculis splendide pri.'
            }, {
                id: 2,
                title: 'Financial Calculator',
                text: 'Cu natum justo quo, cum scripta nominati ei, his no assentior voluptatum. Ne erant intellegat vel, paulo tollit in usu. In deleniti adversarium pro, et mei labitur nusquam oporteat. Meliore incorrupte vel cu, tation incorrupte an nec. Dicat efficiantur conclusionemque id eos. Habeo inermis tractatos eam id, ea ferri decore doctus quo.'
            }, {
                id: 3,
                title: 'OrderNow iOS Application',
                text: 'Vel nemore perpetua ex, eligendi splendide instructior ei pro, aliquip pericula dignissim nec ea. Vix ad simul mollis, est maiorum theophrastus ei. Ex accumsan voluptua definitiones quo, congue everti at per. Pri no modus possim necessitatibus, sea at malis habemus, dicat erant electram eum no'
            }, {
                id: 4,
                title: 'Econometrics Visualization',
                text: 'Vim in homero mandamus, amet ocurreret sea eu. Intellegat inciderint ei vis, vix at dicat constituto. At per facete laboramus delicatissimi. Id consulatu intellegebat eos, mea omnium cetero cu. Efficiendi efficiantur conclusionemque ei quo, at dico tempor detracto sit. Ne utamur civibus laboramus eum, agam brute justo ad mea.'
            }];

        return {
            all: function () {
                return portfolio;
            },
            remove: function (portfolioItem) {
                portfolio.splice(portfolio.indexOf(portfolioItem), 1);
            },
            get: function (reviewId) {
                for (var i = 0; i < portfolio.length; i++) {
                    if (portfolio[i].id === parseInt(portfolioItemId)) {
                        return portfolio[i];
                    }
                }
                return null;
            }
        };
    });