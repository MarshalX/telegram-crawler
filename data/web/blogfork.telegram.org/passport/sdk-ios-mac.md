# iOS &amp; macOS SDK


TGPassportKit helps you easily integrate Telegram Passport requests into your iOS & macOS apps. Check out our [GitHub repository](https://github.com/TelegramMessenger/TGPassportKit) to see samples using this SDK.

### Installation

#### Installing using Cocoapods
To install TGPassportKit via Cocoapods add the following to your Podfile:

	target 'MyApp' do
      pod 'TGPassportKit' 
	end
    
then run `pod install` in your project root directory.

#### Installing using Carthage
Add the following line to your Cartfile:

	github "telegrammessenger/TGPassportKit"
    
then run `carthage update`, and you will get the latest version of TGPassportKit in your Carthage folder.

### Project Setup

#### Configure Your Info.plist
Configure your Info.plist by right-clicking it in Project Navigator, choosing **Open As > Source Code** and adding this snippet:
*Replace `{bot_id}` with your value*

	<key>CFBundleURLTypes</key>
	<array>
	  <dict>
	  <key>CFBundleURLSchemes</key>
	  <array>
	    <string>tgbot{bot_id}</string>
	  </array>
	  </dict>
	</array>
	<key>LSApplicationQueriesSchemes</key>
	<array>
	  <string>tg</string>
	</array>

#### Connect AppDelegate methods
Add this code to your `UIApplicationDelegate` implementation

	#import <TGPassportKit/TGPAppDelegate.h>

	- (BOOL)application:(UIApplication *)application
    			openURL:(NSURL *)url
    			options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
	    BOOL handledByPassportKit = [[TGPAppDelegate sharedDelegate] application:application
        																 openURL:url
                                                                         options:options];

	    return YES;
	}

If you support iOS 9 and below, also add this method:

	- (BOOL)application:(UIApplication *)application 
    			openURL:(NSURL *)url 
      sourceApplication:(nullable NSString *)sourceApplication 
			 annotation:(id)annotation {
		BOOL handledByPassportKit = [[TGPAppDelegate sharedDelegate] application:application
        																 openURL:url
        													   sourceApplication:sourceApplication
        															  annotation:annotation];

		return YES;
	}

### Usage
#### Add Telegram Passport Button
To add the Telegram Passport button, add the following code to your view controller:
*Replace `{bot_id}`, `{bot_public_key}` and `{request_nonce}` with your values*

	#import <TGPassportKit/TGPButton.h>

	@interface ViewController <TGPButtonDelegate>

	@end

	@implementation ViewController

	- (void)viewDidLoad {
	  [super viewDidLoad];

	  TGPButton *button = [[TGPButton alloc] init];
	  button.botConfig = [[TGPBotConfig alloc] initWithBotId:{bot_id} 
      											   publicKey:@"{bot_public_key}"];
	  button.scope = [[TGPScope alloc] initWithJSONString:@"{\"data\":[\"id_document\",\"address_document\",\"phone_number\"],\"v\":1}"];
    // You can also construct a scope using provided data type classes like this: 
    // button.scope = [[TGPScope alloc] initWithTypes:@[[[TGPPersonalDetails alloc] init], [[TGPIdentityDocument alloc] initWithType:TGPIdentityDocumentTypePassport selfie:true translation:true]]];
      button.nonce = @"{request_nonce}";
	  button.delegate = self;
	  [self.view addSubview:button];
	}

	- (void)passportButton:(TGPButton *)passportButton 
     didCompleteWithResult:(TGPRequestResult)result 
    				 error:(NSError *)error {
	    switch (result) {
	        case TGPRequestResultSucceed:
	    		NSLog(@"Succeed");
	            break;
	        
	        case TGPRequestResultCancelled:
				NSLog(@"Cancelled");
	            break;
	        
	        default:
	        	NSLog(@"Failed");
	            break;
	    }
	}

	@end

#### ...or Implement Your Own Behavior
If you want to design a custom UI and behavior, you can invoke a Passport request like this:
*Replace `{bot_id}`, `{bot_public_key}` and `{request_nonce}` with your values*

	#import <TGPassportKit/TGPRequest.h>

	- (void)performPassportRequest 
    {
		TGPBotConfig *botConfig = [[TGPBotConfig alloc] initWithBotId:{bot_id} 
        													publicKey:@"{bot_public_key}"];
		TGPRequest *request = [[TGPRequest alloc] initWithBotConfig:botConfig];
		[request performWithScope:[[TGPScope alloc] initWithJSONString:@"{\"data\":[\"id_document\",\"phone_number\"],\"v\":1}"] 
        				  payload:@"{request_nonce}" 
                completionHandler:^(TGPRequestResult result, NSError * _Nullable error) {
			switch (result) {
				case TGPRequestResultSucceed:
					NSLog(@"Succeed");
					break;

				case TGPRequestResultCancelled:
					NSLog(@"Cancelled");
					break;

				default:
					NSLog(@"Failed");
					break;
			}
	    }];
	}