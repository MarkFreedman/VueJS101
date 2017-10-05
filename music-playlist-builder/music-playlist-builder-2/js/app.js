Vue.component('app', {
    template: `
        <div class="container">
            <section class="row">
                <div class=col-sm-12>
                    <h1 id=app-title :style="{ backgroundColor: titleColor }">Music Playlist Builder</h1>
                </div>
                </section>
                <section class="row">
                <div class="col-sm-5">
                    <h2>Top Tracks
                    <button 
                        class="btn btn-primary pull-right" 
                        @click="loadAllTracks">
                        Load Top Tracks
                    </button>
                    </h2>
                    <ul class="list-group">
                    <li 
                        v-for="(track, index) in tracks" 
                        @click="addTrack(track.artist.name, track.name, index, $event)" 
                        :class="track.class" 
                        class="list-group-item">
                        {{ track | artist }} - {{ track.name }}
                    </li>
                    </ul>
                </div>
                <div class="col-sm-offset-1 col-sm-6">
                    <h2>Selected Tracks <span v-show="modified">*</span>
                    <button 
                        v-if="modified || selectedTracks.length > 0" 
                        class="btn btn-primary pull-right" 
                        @click="savePlaylist">
                        Save Playlist
                    </button>
                    </h2>
                    <ul class="list-group">
                    <li 
                        v-for="(track, index) in selectedTracks" 
                        @click="removeTrack(index)" 
                        class="list-group-item">
                        {{ track.artist }} - {{ track.title }}
                    </li>
                    </ul>
                </div>
            </section>
        </div>`,
    data () {
        return {
            tracks: [],
            selectedTracks: [],
            modified: false,
            titleColor: "rgb(51, 122, 183)"
        }
    },
    methods: {
        loadAllTracks: function () {
          this.$http.get('assets/top-tracks.json').then(response => {
            this.tracks = response.data.tracks.track;
          }, response => {
            // error callback
          });
        },
        addTrack: function (artist, title, index, event) {
          // Only if not currently selected...
          if (this.tracks[index].class === undefined) {
            this.selectedTracks.push({ artist: artist, title: title, index: index });
            this.tracks[index].class = "active";
            this.modified = true;
            this.titleColor = "red";
            console.log(event);
          }
        },
        removeTrack: function (index) {
          if (index > -1) {
            this.tracks[this.selectedTracks[index].index].class = undefined;
            this.selectedTracks.splice(index, 1);
            this.modified = true;
          }
        },
        savePlaylist: function () {
          alert("Save logic goes here.");
          this.modified = false;
          this.titleColor = "rgb(51, 122, 183)";
        }
    },
    filters: {
        artist(value) {
            return "[" + value.artist.name.charAt(0) + "]" + value.artist.name.substring(1);
        }
    },
    created: function () {
        console.log("app");
    }
});
