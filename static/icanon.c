#include <stdio.h>
#include <termios.h>

#define ULLI unsigned long long int
#define FD fileno(stdin)

int main() {

	struct termios old_setting, new_setting;

	// save current terminal control settings
	tcgetattr(FD, &old_setting);

	new_setting = old_setting;

	new_setting.c_lflag &= ~(ICANON | ECHO);
	new_setting.c_cc[VMIN] = 1;
	new_setting.c_cc[VTIME] = 0;

	// apply new settings
	tcsetattr(FD, TCSANOW, &new_setting);

	int c;
	while((c = getchar()) != 'x') {
		printf("You pressed: %d\n", c);
	}

	// restore old settings
	tcsetattr(FD, TCSANOW, &old_setting);

	return 0;
}
