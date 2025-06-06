import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = () => {
  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>let's build your dream business together</CardTitle>
          <CardDescription>
            We can help you with your digital marketing need
          </CardDescription>
          <CardDescription>
            At Edge Hit, our marketing trategy is not one size fits all. Reach
            out and we will assit you with customize social media marketing plan
            that fit your business goal using out data driven ML model to bring
            your alive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action="">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input required type="text" placeholder="Name" />
              <div className="flex flex-col gap-2">
                <Label>Phone</Label>
                <Input
                  required
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-1234"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input required type="email" placeholder="Email" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Message</Label>
                <Textarea required placeholder="Type message here..." />
              </div>
            </div>
            <Button className="bg-[#FFA500]">Submit</Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Form;
