// structure for persistent storage in eeprom (limited to 100,000 lifetime writes)
struct settings_t
{
  byte flag;
  long timesWritten;
  int year;
  int ampsOutZeroCount;
  int ampsInZeroCount;
  float ampsOutScaleFactor;
  float ampsInScaleFactor; // volts per amp
  float ampRatio;
  float voltsScaleFactor;
  char dummy[30]; // add space to the block that gets written
} 
settings;

const int buckets=20;
struct energy_t
{ float wattHrs[buckets]; //each bucket will be written < 90,000 times for 20 years
  long seconds[buckets];  //time is seconds when the last wattHrs was read
} energy;

typedef struct button_t
{
  int pin;
  boolean active;
  boolean short_press;
  boolean long_press;
  unsigned long long_press_timeout;
  unsigned long activeMSlast;
  unsigned long activeMSstart;
};

