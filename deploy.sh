response=$(curl 'https://api.applivery.io/v1/integrations/builds' \
-X POST \
-H 'Authorization: bearer JiLk5I6WuID6gqNC1SdwLK_4' \
-F build=@'android/app/build/outputs/apk/release/app-release-unsigned.apk' \
-F 'versionName=4.8' \
-F 'changelog=' \
-F notifyCollaborators=false \
-F notifyEmployees=false \
-F 'deployer.name=Custom CI PLatform' \
2>&1)

if [ $? -eq 0 ]; then
    echo "API call succeeded. Response was: $response"
else
    echo "API call failed. Error was: $response"
fi
