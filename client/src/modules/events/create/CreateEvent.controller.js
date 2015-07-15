(() => {

    class CreateEventController {

        constructor(NewEvent, $state, $openFB, $ionicPlatform) {
            this.NewEvent = NewEvent;
            this.$state = $state;
            this.$ionicPlatform = $ionicPlatform;

            this.days = (() => {
                for (var i = 1, list = []; i <= 31; i++)
                    list.push(i);
                return list;
            })();

            this.months = ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];

            this.years = (() => {
                let date = new Date();
                let year = date.getFullYear();
                for (var i = year, years = []; i <= year + 5; i++)
                    years.push(i);
                return years;
            })();
            var self = this;
            $openFB.api({
                path: '/me/friends'
            }, (error, result) => {
                if (!error) {
                    self.friends = result.data.data;
                }
            });
        }

        submit(eventForm) {
            this.submitting = true;
            if (eventForm.$invalid) {
                // Maybe do something more intelligent here
                return;
            }
            _.merge(this.NewEvent, eventForm.newEvent);

            let startTime = new Date(this.NewEvent.meta.year, this.NewEvent.meta.month, this.NewEvent.meta.day);
            this.NewEvent.startTime = startTime.getTime();
            delete this.NewEvent.meta;

            this.NewEvent.post().then(
                (event) => this.onEventSubmitSuccess(event),
                (err) => this.onEventSubmitError(err)
            );
        }

        onEventSubmitSuccess(event) {
            this.submitting = false;
            this.$ionicPlatform.onHardwareBackButton((e) => {
                this.$scope.go('events.list');
                e.stopPropagation();
            });
            this.$state.go('events.detail.overview', {
                eventId: event.id,
                event: event
            });
        }

        onEventSubmitError(error) {
            this.submitting = false;
        }

    }

    CreateEventController.$inject = ['NewEvent', '$state', '$openFB', '$ionicPlatform'];

    angular.module('fomo.events.create', [
            'fomo.events.Event',
            'ngOpenFB',
            'fomo.select'
        ])
        .controller('CreateEventController', CreateEventController);

})();