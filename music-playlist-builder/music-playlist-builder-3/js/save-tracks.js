Vue.component('saveTracks', {
    template: `
        <h2>Selected Tracks <span v-show="modified">*</span>
            <button 
                v-if="modified" 
                class="btn btn-primary pull-right" 
                @click="savePlaylist">
                Save Playlist
            </button>
        </h2>`,
    props: ['modified'],
    methods: {
        savePlaylist: function () {
          alert("Save logic goes here.");
          this.modified = false;
        }
    },
    created: function () {
        console.log("saveTracks");
    }
});
