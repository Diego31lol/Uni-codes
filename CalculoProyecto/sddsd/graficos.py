import matplotlib.pyplot as plt
import numpy as np
from scipy.fft import fft, fftfreq

def graficar_signal_fourier(frecuencia1, frecuencia2):
    """
    Graficar una señal compuesta por dos ondas senoidales de frecuencias
    dadas y su transformada de Fourier.
    """
    # Definir el tiempo de la señal (1000 puntos entre 0 y 1 segundo)
    x = np.linspace(0, 1, 1000)
    
    # Definir las dos señales senoidales con las frecuencias proporcionadas
    y = np.sin(2 * np.pi * frecuencia1 * x) + np.sin(2 * np.pi * frecuencia2 * x)
    
    # Calcular la transformada de Fourier
    N = len(x)
    T = x[1] - x[0]  # Intervalo de tiempo entre los puntos
    yf = fft(y)
    xf = fftfreq(N, T)[:N // 2]
    yf = 2.0 / N * np.abs(yf[:N // 2])
    
    # Graficar la señal en el dominio del tiempo
    fig, axs = plt.subplots(2, 1, figsize=(8, 6))
    
    # Señal en el dominio del tiempo
    axs[0].plot(x, y)
    axs[0].set_title("Señal Compuesta en el Dominio del Tiempo")
    axs[0].set_xlabel("Tiempo [s]")
    axs[0].set_ylabel("Amplitud")
    
    # Espectro de frecuencia (transformada de Fourier)
    axs[1].plot(xf, yf)
    axs[1].set_title("Transformada de Fourier (Espectro de Frecuencia)")
    axs[1].set_xlabel("Frecuencia [Hz]")
    axs[1].set_ylabel("Amplitud")
    
    plt.tight_layout()
    plt.show()
