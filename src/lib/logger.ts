type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  log(level: LogLevel, message: string, payload?: Record<string, any>) {
    const logEntry = { level, message, timestamp: new Date().toISOString(), ...payload };

    if (this.isProduction) {
      // In production, send to external monitoring (e.g., Sentry, Datadog)
      if (level === 'error') {
        console.error(JSON.stringify({ message, level }));
      }
    } else {
      console[level](`[${level.toUpperCase()}] ${message}`, payload || '');
    }
  }

  info(message: string, payload?: Record<string, any>) { this.log('info', message, payload); }
  warn(message: string, payload?: Record<string, any>) { this.log('warn', message, payload); }
  error(message: string, payload?: Record<string, any>) { this.log('error', message, payload); }
  debug(message: string, payload?: Record<string, any>) { if (!this.isProduction) this.log('debug', message, payload); }
}

export const logger = new Logger();