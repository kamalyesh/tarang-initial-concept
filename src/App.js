import { useState } from 'react';
import './App.css';
import Tarang from './components/v1/index'
function App() {

  const srcArray = [
    {
      audioUrl: "audio/tom-and-jerry-ringtone.mp3",
      coverArtUrl: "images/tom-and-jerry-ringtone-cover.png"
    },
    {
      audioUrl: "audio/Ainz-Ooal-Gown.mp3",
      coverArtUrl: "images/Ainz-Ooal-Gown-cover.png"
    },
    {
      audioUrl: "audio/aLIEz.mp3",
      coverArtUrl: "images/aLIEz-cover.png"
    },
    {
      audioUrl: "audio/First-Light.mp3",
      coverArtUrl: "images/First-Light-cover.gif"
    },
    {
      audioUrl: "audio/SaO.mp3",
      coverArtUrl: "images/SaO-cover.png"
    },
    {
      audioUrl: "audio/theDevilRegainsHisStrength.mp3",
      coverArtUrl: "images/theDevilRegainsHisStrength-cover.png"
    },
    {
      audioUrl: "audio/VORACITY.mp3",
      coverArtUrl: "images/VORACITY-cover.png"
    }
  ]

  const DEFAULT_SRC = 0
  const [src, updateSrc] = useState(DEFAULT_SRC)
  const [lineControlsVisible, setLineControlsVisible] = useState(false)
  const [barControlsVisible, setBarControlsVisible] = useState(false)

  const reset = () => { updateSrc(DEFAULT_SRC); }
  const setSrc = (index) => { updateSrc(index) }

  return (
    <div className="App">
      <section>
        <table>
          <thead>
            <tr>
              <table style={{ position: 'relative', width: "400px", height: "300px" }}>
                <tbody>
                  {
                    srcArray.map((srcItem, srcIndex) => <tr key={JSON.stringify(srcItem).length + "_" + srcIndex} style={{ "textDecoration": "link", "cursor": "pointer" }}>
                      <td>
                        <a target="_self" onClick={() => setSrc(srcIndex)}>{srcItem.audioUrl}</a>
                      </td>
                    </tr>) || null
                  }
                </tbody>
                <legend>
                  <button onClick={reset}>Reset</button>
                </legend>
              </table>
            </tr>
          </thead>
          <tbody>
            <tr>
              <table style={{ position: 'relative', width: "400px", height: "100px" }}>
                <tbody>
                  <tr>
                    <td>
                      Now Playing
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {srcArray[src].audioUrl}
                    </th>
                  </tr>
                </tbody>
              </table>
            </tr>
            <tr>
              <td>
                <table>
                  <legend>Virtualization as Bar Graph</legend>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="line-control">Show Controls
                          <input type="checkbox" onChange={(e) => setLineControlsVisible(e.target.checked)} id="line-control" checked={lineControlsVisible} />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ position: 'relative', width: "400px", height: "300px" }}>
                          <Tarang.Line
                            width={400}
                            audioUrl={srcArray[src].audioUrl}
                            controls={lineControlsVisible}
                            coverArtUrl={srcArray[src].coverArtUrl}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <legend>Virtualization as Line Graph</legend>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="bar-control">Show Controls
                          <input type="checkbox" onChange={(e) => setBarControlsVisible(e.target.checked)} id="bar-control" checked={barControlsVisible} />
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style={{ position: 'relative', width: "400px", height: "300px" }}>
                          <Tarang.Bar
                            audioUrl={srcArray[src].audioUrl}
                            coverArtUrl={srcArray[src].coverArtUrl}
                            controls={barControlsVisible}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
