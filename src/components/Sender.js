import React, { Component } from 'react';
import { RaisedButton, TextField, Divider, SelectField, MenuItem } from 'material-ui';
import './Sender.css';

class Player extends Component {
  constructor(props) {
      super(props);
      this.state = {
        mediaUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-dash-widevine.ism/.mpd',
        licenseUrl: "https://widevine-proxy.appspot.com/proxy",
        drm: null,
      };

      this.namespace = 'urn:x-cast:com.google.cast.mediacast';
      this.applicationId = 'B24212A8';

      this._cast = window.cast;
      this._chrome = window.chrome;
      this._session = null;

      this.init();
  }

  init() {
    window['__onGCastApiAvailable'] = (isAvailable) => {
        if (isAvailable) {
            this.initializeCastApi();
        }
    };
  }

  initializeCastApi() {
    this._cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: this.applicationId,
        autoJoinPolicy: this._chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
  }

  connect = () => {
    if (this._cast) {
      this._cast.framework.CastContext.getInstance().requestSession();
    }
  }

  loadMedia = () => {

    const { mediaUrl, licenseUrl, drm } = this.state;

    const contentType = 'application/dash+xml';
    const castSession = this._cast.framework.CastContext.getInstance().getCurrentSession();
    const mediaInfo = new this._chrome.cast.media.MediaInfo(mediaUrl, contentType);
    mediaInfo.customData = { licenseUrl, drm };
    const request = new this._chrome.cast.media.LoadRequest(mediaInfo);

    castSession.loadMedia(request).then(() => {
      console.log('Load succeed');
      castSession.sendMessage(this.namespace, "trying to load media");
    }, function(err) {
        console.log('Error:', err);
    });
  }

  playPause = () => {
    const player = new this._cast.framework.RemotePlayer();
    const playerController = new this._cast.framework.RemotePlayerController(player);
    playerController.playOrPause();
  }

  testMessage = () => {
    const castSession = this._cast.framework.CastContext.getInstance().getCurrentSession();
    castSession.sendMessage(this.namespace, "Test Message");
  }

  handleChangeMediaUrl = (event) => {
    this.setState({ mediaUrl: event.target.value });
  }

  handleChangeLicenseUrl = (event) => {
    this.setState({ licenseUrl: event.target.value });
  }

  handleDrmChange = (event, index, value) => this.setState({drm: value});

  render() {
    return (
      <div className="Player">
          <h1>player</h1>
          <div>
            <TextField
              hintText="Media URL"
              floatingLabelText="Media URL"
              defaultValue={this.state.mediaUrl}
              style={ { width: '80%' } }
              onChange={this.handleChangeMediaUrl}
            />
          </div>
          <div>
            <TextField
              hintText="License Server URL"
              floatingLabelText="License Server URL"
              defaultValue={this.state.licenseUrl}
              style={ { width: '80%' } }
              onChange={this.handleChangeLicenseUrl}
            />
          </div>
          <div>
            <SelectField
              floatingLabelText="DRM"
              value={this.state.drm}
              onChange={this.handleDrmChange}
             >
              <MenuItem value="" primaryText="None" />
              <MenuItem value="widevine" primaryText="Widevine" />
              <MenuItem value="playready" primaryText="Playready" />
            </SelectField>
          </div>
          <div>
            <Divider />
            <span className="Cast-Button"><button is="google-cast-button"></button></span>
            <RaisedButton className="Button" label="Connect" onClick={this.connect} /> 
            <RaisedButton className="Button" label="Load Media" onClick={this.loadMedia} />
            <RaisedButton className="Button" label="Test Message" onClick={this.testMessage} />
            <RaisedButton className="Button" label="Play/Pause" onClick={this.playPause} />
          </div>
      </div>
    );
  }
}


export default Player;