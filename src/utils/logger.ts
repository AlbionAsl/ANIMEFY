// src/utils/logger.ts
enum LogLevel {
    INFO,
    WARN,
    ERROR,
  }
  
  class Logger {
    private log(level: LogLevel, message: string, ...args: any[]) {
      const timestamp = new Date().toISOString();
      const prefix = `[${timestamp}] [${LogLevel[level]}]`;
      console.log(prefix, message, ...args);
    }
  
    info(message: string, ...args: any[]) {
      this.log(LogLevel.INFO, message, ...args);
    }
  
    warn(message: string, ...args: any[]) {
      this.log(LogLevel.WARN, message, ...args);
    }
  
    error(message: string, ...args: any[]) {
      this.log(LogLevel.ERROR, message, ...args);
    }
  }
  
  export const logger = new Logger();