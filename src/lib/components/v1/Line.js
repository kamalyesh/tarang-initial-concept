import { useEffect, useRef, useState } from "react";
import getNextId from "../../../utils/getNextId";
import binrayFloor from "../../../utils/binrayFloor";
import * as d3 from 'd3'

export default function Line({ audioUrl, coverArtUrl, width, height, controls = false }) {
    // TODO: add state loaded. to check that the user has interacted with the page. so that the autoplay functionality can also be added in future
    const initialDimensions = { WIDTH: 256, HEIGHT: 280, PLAYER_HEIGHT: 80 }
    const [isPlaying, setIsPlaying] = useState(false)
    const [canvasId, setCanvasId] = useState(getNextId())
    const [dimensions, setDimensions] = useState(initialDimensions)
    const audioRef = useRef(new Audio())
    const audioContextRef = useRef(null)
    const audioSrcRef = useRef(null);
    const analyserRef = useRef(null);
    const svgRef = useRef(null);

    useEffect(() => {
        if (width || height) {
            let newDimensions = dimensions;
            if (width) newDimensions.WIDTH = binrayFloor(width);
            if (height) newDimensions.HEIGHT = height;
            setDimensions(newDimensions);
        }
    }, [width, height])

    const clearSvg = () => {
        if (svgRef.current) svgRef.current.selectAll("*").remove()
        console.log("clearing svg")
    }

    const updateSvg = (frequencies, height = dimensions.HEIGHT - dimensions.PLAYER_HEIGHT, width = dimensions.WIDTH) => {
        analyserRef.current.getByteFrequencyData(frequencies);
        if (svgRef.current && frequencies.length) {
            clearSvg()
            var line1Func = d3.line()
                .x(function (d, i) {
                    return i * (width / frequencies.length);
                })
                .y(function (d) {
                    return (height * 0.9) - (d * 0.4);
                })
            var line2Func = d3.line()
                .x(function (d, i) {
                    return i * (width / frequencies.length);
                })
                .y(function (d) {
                    return (height * 0.9) - (d * 0.8);
                })
            svgRef.current.append('path')
                // .attr('d', line1Func(frequencies))
                .attr('d', line2Func(frequencies))
                .attr('stroke', 'black')
                .attr('fill', 'none')


        }
    }
    const createSvg = (frequencies, height = ((dimensions.HEIGHT - dimensions.PLAYER_HEIGHT) * 0.9), width = dimensions.WIDTH) => {
        if (!d3) console.warn("d3 is not found. Tarang may not behave as expected.")
        else {
            // console.log("creating visualization graph ", { d3 })
            if (!svgRef.current) {
                svgRef.current = d3.select('#' + canvasId)
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width)
                    .attr('class', 'my-1')
                    .attr('style', coverArtUrl ? `background: url(${coverArtUrl});` : 'background: liniear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 118, 124, 0.73))')
                    .attr('id', "line_" + canvasId + "_" + getNextId());
            }

            const updateFrequencyData = () => {
                try {
                    if (!audioRef.current || audioRef.current.paused) {
                        cancelAnimationFrame(updateFrequencyData)
                        // return;
                    } else {
                        requestAnimationFrame(updateFrequencyData)
                        updateSvg(frequencies)
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            updateFrequencyData()
        }
    }
    // useEffect(updateSvg, [frequencyData])
    const play = () => {
        try {
            setIsPlaying(true)
            if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
            if (!audioSrcRef.current) audioSrcRef.current = audioContextRef.current.createMediaElementSource(new Audio(audioUrl))

            audioRef.current = audioSrcRef.current.mediaElement
            audioRef.current.crossOrigin = "anonymous"

            audioRef.current.play()
            audioRef.current.onended = (event) => clearSvg()
            analyserRef.current = audioContextRef.current.createAnalyser()

            audioSrcRef.current.connect(analyserRef.current);
            audioSrcRef.current.connect(audioContextRef.current.destination);

            analyserRef.current.fftSize = dimensions.WIDTH;
            const bufferLength = analyserRef.current.frequencyBinCount;
            const frequencies = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(frequencies);
            // console.log({ frequencies })
            createSvg(frequencies)
        } catch (error) {
            console.error(error)
        }
    }
    const stop = () => {
        setIsPlaying(false)
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        clearSvg()
    }

    const focusIn = () => {
        if (!controls) {
            if (!isPlaying) {
                play()
            }
        }
    }

    const focusOut = () => {
        if (!controls) {
            if (isPlaying) {
                stop()
            }
        }
    }

    const toggleFocus = () => {
        if (isPlaying) focusOut()
        else focusIn()
    }

    return <>
        <div
            onMouseEnter={focusIn}
            onFocus={focusIn}
            onPointerEnter={focusIn}

            // onTouch={toggleFocus}
            // onClick={toggleFocus}

            onMouseLeave={focusOut}
            onBlur={focusOut}
            onPointerLeave={focusIn}

            style={{ top: 0, left: 0, width: dimensions.WIDTH, height: dimensions.HEIGHT, position: "relative" }}>
            <div id={canvasId} style={{ "flex": 1, position: "absolute", top: 0, bottom: controls ? 40 : 0, left: 0, right: 0, backgroundColor: "#eeeeeeaa" }}>

            </div>
            {
                controls ?
                    <div style={{ "flex": 1, position: "absolute", top: dimensions.HEIGHT - 40, bottom: 0, left: 0, right: 0 }} >
                        <button onClick={play}>Play</button>
                        <button onClick={stop}>Stop</button>
                    </div> : <>
                    </>
            }
        </div>
    </>
}