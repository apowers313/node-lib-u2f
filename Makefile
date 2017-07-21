INCLS=-Isrc/libu2ftest/HID
LIBPATH=-Lsrc/libu2ftest/HID
# LIBS=-force_load -lsrc/libu2ftest/HID/libu2ftest.a
LIBS += -framework CoreFoundation
LIBS += -framework IOKit
LIBS += -force_load src/libu2ftest/HID/*.o
#gcc -dynamiclib -install_name

.PHONY: lib/u2f-lib.dylib deplib
all: lib/u2f-lib.dylib

lib/u2f-lib.dylib: src/u2f-lib.c Makefile deplib
	g++ -dynamiclib -fPIC -shared $(INCLS) $(LIBS) -o lib/u2f-lib.dylib
	nm -gU lib/u2f-lib.dylib
#	g++ -dynamiclib -fPIC -shared $(INCLS) $(LIBPATH) $(LIBS) -o lib/u2f-lib.dylib
#	ld -dynamic $(LIBPATH) -lgcc_s.1 -arch x86_64 -macosx_version_min 10.12 -framework CoreFoundation -framework IOKit -all_load src/libu2ftest/HID/libu2ftest.a -o lib/u2f-lib.dylib
#	gcc -dynamiclib -fPIC -o lib/u2f-lib.dylib $(INCLS) $(LIBPATH) $(LIBS) src/u2f-lib.c
#	install_name_tool -change u2f-lib.0.dylib src/cbor/lib/u2f-lib.0.dylib lib/u2f-lib.dylib

deplib:
	cd src/libu2ftest/HID && \
	make
