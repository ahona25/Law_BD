import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

// Default coordinates: Dhaka, Bangladesh
const DEFAULT_LAT = 23.8103;
const DEFAULT_LNG = 90.4125;

/**
 * Computes approximate local sunrise and sunset Date objects for a given date and coordinates
 * using standard NOAA solar position equations.
 */
export function getSunTimes(date = new Date(), lat = DEFAULT_LAT, lng = DEFAULT_LNG) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear + (startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
  const dayOfYear = Math.floor(diff / 86400000);

  const tzOffsetHours = -date.getTimezoneOffset() / 60;
  const lngHour = lng / 15;

  const calcTime = (isSunrise) => {
    const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * t - 3.289;
    let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
    L = ((L % 360) + 360) % 360;

    let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
    RA = ((RA % 360) + 360) % 360;

    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = (RA + (Lquadrant - RAquadrant)) / 15;

    const sinDec = 0.39782 * Math.sin(L * rad);
    const cosDec = Math.cos(Math.asin(sinDec));
    const zenith = 90.833;
    const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));

    if (cosH > 1 || cosH < -1) {
      // Fallback 6:00 AM / 6:00 PM at extreme latitudes
      const fallback = new Date(date);
      fallback.setHours(isSunrise ? 6 : 18, 0, 0, 0);
      return fallback;
    }

    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;

    const T = H + RA - 0.06571 * t - 6.622;
    let UT = ((T - lngHour) % 24 + 24) % 24;
    const localTime = ((UT + tzOffsetHours) % 24 + 24) % 24;

    const hours = Math.floor(localTime);
    const minutes = Math.floor((localTime - hours) * 60);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  };

  return {
    sunrise: calcTime(true),
    sunset: calcTime(false)
  };
}

function isNightBySun(now = new Date(), lat = DEFAULT_LAT, lng = DEFAULT_LNG) {
  const { sunrise, sunset } = getSunTimes(now, lat, lng);
  return {
    isNight: now >= sunset || now < sunrise,
    sunrise,
    sunset
  };
}

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('lawbd_theme_mode');
    return saved === 'light' || saved === 'dark' || saved === 'auto' ? saved : 'auto';
  });

  const [sunState, setSunState] = useState(() => isNightBySun(new Date()));

  const refreshSunState = useCallback(() => {
    setSunState(isNightBySun(new Date()));
  }, []);

  // Periodically check sunrise/sunset so automatic day/night switching happens live
  useEffect(() => {
    refreshSunState();
    const interval = setInterval(refreshSunState, 30000);
    return () => clearInterval(interval);
  }, [refreshSunState]);

  const isDark = themeMode === 'dark' ? true : themeMode === 'light' ? false : sunState.isNight;

  useEffect(() => {
    localStorage.setItem('lawbd_theme_mode', themeMode);
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isDark, themeMode]);

  const toggleDayNight = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  const enableAutoMode = () => {
    refreshSunState();
    setThemeMode('auto');
  };

  const toggleAutoMode = () => {
    if (themeMode === 'auto') {
      setThemeMode('light');
    } else {
      enableAutoMode();
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDark,
        setThemeMode,
        toggleDayNight,
        enableAutoMode,
        toggleAutoMode,
        sunrise: sunState.sunrise,
        sunset: sunState.sunset
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
